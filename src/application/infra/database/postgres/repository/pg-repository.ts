/* eslint-disable quotes */
import { Repository } from "@/application/infra/contracts/repository";
import { connect } from "../databaseConfig";

export class PostgresRepository extends Repository {
  private tableName: string;

  constructor(tableName: string) {
    super();
    this.tableName = tableName;
  }

  async insertOne(data: any) {
    const client = await connect();
    try {
      const columns = Object.keys(data)
        .map((key) => `"${key}"`)
        .join(", ");
      const values = Object.values(data);
      const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

      const query = `INSERT INTO "${this.tableName}" (${columns}) VALUES (${placeholders}) RETURNING *`;
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async add(data: any): Promise<any> {
    const inserted = await this.insertOne(data);
    return inserted;
  }

  async updateOne(id: any, data: any) {
    const client = await connect();
    try {
      const updates = Object.keys(data)
        .map((key, index) => `"${key}" = $${index + 2}`)
        .join(", ");
      const query = `UPDATE "${this.tableName}" SET ${updates} WHERE "_id" = $1 RETURNING *`;
      const values = [id, ...Object.values(data)];
      const result = await client.query(query, values);
      return result.rowCount ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async deleteOne(fields: any) {
    return this.deleteMany(fields);
  }

  async getOne(query: any) {
    const client = await connect();
    try {
      const { whereClause, values } = this.buildWhereClause(query);

      const queryText = `SELECT * FROM "${this.tableName}" WHERE ${whereClause} LIMIT 1`;
      const result = await client.query(queryText, values);

      return result.rows.length ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  // Helper function to build WHERE clause dynamically
  buildWhereClause(query: any) {
    const keys = Object.keys(query);
    const values = keys.map((key) => query[key]);
    const whereClause = keys.map((key, index) => `"${key}" = $${index + 1}`).join(" AND ");
    return { whereClause, values };
  }

  async getAll() {
    const client = await connect();
    try {
      const query = `SELECT * FROM "${this.tableName}"`;
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getPaginate(page = 0, fields: any, sort: any, limit = 10, projection: any) {
    const client = await connect();
    try {
      // Handle projection
      let columns = "*";
      if (Object.keys(projection).length > 0) {
        columns = Object.keys(projection)
          .filter((key) => projection[key])
          .map((key) => `"${key}"`)
          .join(", ");
      }

      // Handle filtering (basic example, needs to be adjusted per use case)
      let whereClause = "";
      const filterConditions: string[] = [];
      const filterValues: any[] = [];
      Object.keys(fields).forEach((key) => {
        const value = fields[key];
        if (typeof value === "string" || typeof value === "number") {
          filterConditions.push(`"${key}" = $${filterValues.length + 1}`);
          filterValues.push(value);
        } else {
          filterConditions.push(`"${key}" LIKE '%' || $${filterValues.length + 1} || '%'`);
          filterValues.push(value); // Adjust this accordingly if you're sanitizing your inputs
        }
      });
      if (filterConditions.length > 0) {
        whereClause = `WHERE ${filterConditions.join(" AND ")}`;
      }

      // Handle sorting
      const orderBy = Object.keys(sort)
        .map((key) => `"${key}" ${sort[key] === -1 ? "DESC" : "ASC"}`)
        .join(", ");

      // Calculate offset
      const offset = (page - 1) * limit;

      // Construct query
      const queryText = `SELECT ${columns} FROM "${this.tableName}" ${whereClause} ORDER BY ${orderBy} LIMIT $${filterValues.length + 1} OFFSET $${filterValues.length + 2}`;
      const queryValues = filterValues.concat([limit, offset]);
      const result = await client.query(queryText, queryValues);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async aggregate(query: any) {
    const client = await connect();
    try {
      const result = await client.query(query.text.replace(/\\/g, ""), query.values);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getCount(query = {}) {
    const client = await connect();
    try {
      // Constructing WHERE clause based on the query object
      const whereClause = Object.keys(query)
        .map((key) => `"${key}" = $${Object.keys(query).indexOf(key) + 1}`)
        .join(" AND ");
      const queryParams = Object.values(query);

      const queryText = `SELECT COUNT(*) FROM "${this.tableName}" ${whereClause ? `WHERE ${whereClause}` : ""}`;
      const result = await client.query(queryText, queryParams);
      return result.rows[0].count;
    } finally {
      client.release();
    }
  }

  async upsertAndPush(query: any, data: any, pushData: any) {
    const client = await connect();
    try {
      // Assuming pushData is an object where keys are columns and values are arrays to append
      // This example assumes there's a single key-value pair in pushData
      const keyToPush = Object.keys(pushData)[0];
      const valuesToPush = pushData[keyToPush];

      // Start transaction
      await client.query("BEGIN");

      const selectQuery = `SELECT "${keyToPush}" FROM "${this.tableName}" WHERE "${Object.keys(query)[0]}" = $1`;
      const selectResult = await client.query(selectQuery, [query[Object.keys(query)[0]]]);

      if (Number(selectResult?.rowCount ?? 0) > 0) {
        // Update case: append to the existing array
        const updatedArray = selectResult.rows[0][keyToPush].concat(valuesToPush);
        const updateQuery = `UPDATE "${this.tableName}" SET "${keyToPush}" = $1 WHERE "${Object.keys(query)[0]}" = $2`;
        await client.query(updateQuery, [updatedArray, query[Object.keys(query)[0]]]);
      } else {
        // Insert case: insert new row with a new array
        data[keyToPush] = valuesToPush;
        const insertColumns = Object.keys(data)
          .map((key) => `"${key}"`)
          .join(", ");
        const insertValues = Object.values(data);
        const insertPlaceholders = insertValues.map((_, idx) => `$${idx + 1}`).join(", ");

        const insertQuery = `INSERT INTO "${this.tableName}" (${insertColumns}) VALUES (${insertPlaceholders})`;
        await client.query(insertQuery, insertValues);
      }

      await client.query("COMMIT");
      return true;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async update(query: any, data: any) {
    const client = await connect();
    try {
      const setClause = Object.keys(data)
        .map((key, idx) => `"${key}" = $${idx + 1}`)
        .join(", ");
      const whereClause = Object.keys(query)
        .map((key, idx) => `"${key}" = $${idx + Object.keys(data).length + 1}`)
        .join(" AND ");
      const values = [...Object.values(data), ...Object.values(query)];

      const queryText = `UPDATE "${this.tableName}" SET ${setClause} WHERE ${whereClause} RETURNING *`;
      const result = await client.query(queryText, values);
      return result.rows[0]; // Retorna o registro atualizado
    } finally {
      client.release();
    }
  }

  async incrementOne(query: any, data: any): Promise<any> {
    return this.increment(query, data);
  }

  async increment(query: any, data: any) {
    const client = await connect();
    try {
      const setClause = Object.keys(data)
        .map((key, idx) => `"${key}" = "${key}" + $${idx + 1}`)
        .join(", ");
      const whereClause = Object.keys(query)
        .map((key, idx) => `"${key}" = $${idx + Object.keys(data).length + 1}`)
        .join(" AND ");
      const values = [...Object.values(data), ...Object.values(query)];

      const queryText = `UPDATE "${this.tableName}" SET ${setClause} WHERE ${whereClause}`;

      const result = await client.query(queryText, values);
      return result.rowCount;
    } finally {
      client.release();
    }
  }
  async deleteMany(query: any) {
    const client = await connect();
    try {
      const whereClause = Object.keys(query)
        .map((key, idx) => `"${key}" = $${idx + 1}`)
        .join(" AND ");
      const queryParams = Object.values(query);

      const queryText = `DELETE FROM "${this.tableName}" WHERE ${whereClause}`;
      const result = await client.query(queryText, queryParams);
      return result.rowCount;
    } finally {
      client.release();
    }
  }
}
