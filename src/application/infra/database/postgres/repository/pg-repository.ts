/* eslint-disable prefer-const */
import { Repository } from "@/application/infra/contracts";
import { connect } from "@/application/infra/database/postgres/databaseConfig";
export class PostgresRepository extends Repository {
  private tableName: string;
  constructor(tableName: string) {
    super();
    this.tableName = tableName;
  }
  buildWhereClause(query: any): { whereClause: string; values: any[] } {
    const whereClause = Object.keys(query)
      .map((key, idx) => `"${this.tableName}"."${key}" = $${idx + 1}`)
      .join(" AND ");
    const values = Object.values(query);
    return { whereClause, values };
  }
  async add(data: any): Promise<any> {
    const inserted = await this.insertOne(data);
    return inserted;
  }
  async insertOne(data: any): Promise<any> {
    const client = await connect();
    try {
      const columns = Object.keys(data)
        .map((key) => `"${key}"`)
        .join(", ");
      const values = Object.values(data);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
      const query = `INSERT INTO "${this.tableName}" (${columns}) VALUES (${placeholders}) RETURNING *`;
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
  async updateOne(id: any, data: any): Promise<any> {
    const client = await connect();
    try {
      const updates = Object.keys(data)
        .map((key, index) => `"${key}" = $${index + 2}`)
        .join(", ");
      const query = `UPDATE "${this.tableName}" SET ${updates} WHERE "_id" = $1 RETURNING *`;
      const result = await client.query(query, [id, ...Object.values(data)]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
  async update(query: any, data: any): Promise<any> {
    const client = await connect();
    try {
      const setClause = Object.keys(data)
        .map((key, index) => `"${key}" = $${index + 1}`)
        .join(", ");
      const whereClause = Object.keys(query)
        .map((key, idx) => `"${key}" = $${idx + Object.keys(data).length + 1}`)
        .join(" AND ");
      const values = [...Object.values(data), ...Object.values(query)];

      const queryText = `UPDATE "${this.tableName}" SET ${setClause} WHERE ${whereClause} RETURNING *`;
      const result = await client.query(queryText, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
  async upsertAndPush(query: any, data: any, pushData: any): Promise<any> {
    const client = await connect();
    let result;
    try {
      // Assuming pushData is an object where keys are columns and values are arrays to append
      const keyToPush = Object.keys(pushData)[0];
      const valuesToPush = pushData[keyToPush];

      // Convert pushData to JSON string
      const valuesToPushJson = JSON.stringify(valuesToPush);

      // Start transaction
      await client.query("BEGIN");

      const selectQuery = `SELECT "${keyToPush}" FROM "${this.tableName}" WHERE "${Object.keys(query)[0]}" = $1 AND "${Object.keys(query)[1]}" = $2`;
      const selectResult = await client.query(selectQuery, [
        query[Object.keys(query)[0]],
        query[Object.keys(query)[1]],
      ]);

      // Update case: append to the existing array
      let updatedArray = [];
      if (Array.isArray(selectResult?.rows?.[0]?.[keyToPush])) {
        updatedArray = selectResult.rows[0][keyToPush].concat(valuesToPushJson);
      } else {
        updatedArray = [valuesToPushJson];
      }
      const chave = Object.keys(query)[0];
      const chave2 = Object.keys(query)[1];
      const valor = query[Object.keys(query)[0]];
      const valor2 = query[Object.keys(query)[1]];
      const updateQuery = `UPDATE "${this.tableName}" SET "${keyToPush}" = $1 WHERE "${chave}" = $2 AND "${chave2}" = $3 RETURNING *`;
      result = await client.query(updateQuery, [
        JSON.stringify(updatedArray),
        valor,
        valor2,
      ]);

      await client.query("COMMIT");
      return result.rows[0];
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
  async incrementOne(query: any, data: any): Promise<any> {
    return this.increment(query, data);
  }
  async increment(query: any, data: any): Promise<any> {
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
  async deleteMany(query: any): Promise<any> {
    const client = await connect();
    try {
      const whereClause = Object.keys(query)
        .map((key, idx) => `"${key}" = $${idx + 1}`)
        .join(" AND ");
      const values = Object.values(query);
      const queryText = `DELETE FROM "${this.tableName}" WHERE ${whereClause}`;
      const result = await client.query(queryText, values);
      return result.rowsCount;
    } finally {
      client.release();
    }
  }
  async deleteOne(fields: any): Promise<any> {
    return this.deleteMany(fields);
  }
  async getTableFields(tableName: string, client: any): Promise<string[]> {
    // Consulta para obter os nomes das colunas da tabela
    const result = await client.query(
      `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = $1
    `,
      [tableName]
    );
    if (result.rows.length === 0) {
      return [];
    }

    return result?.rows
      ?.map?.((row: any) => row?.column_name)
      ?.filter?.((field: any) => field !== "password");
  }
  async getOne(query: any, options: any, returnOneRegister = true): Promise<any> {
    let currentTableFields: any;
    const client = await connect();
    try {
      const { whereClause, values } = this.buildWhereClause(query);

      // Padrão para selecionar todos os campos da tabela principal
      let selectClause = `"${this.tableName}".*`;
      let joinClause = ""; // Aqui acumulamos os JOINs dinâmicos

      if (options?.projection) {
        const projection = options.projection;

        // Identifica campos a serem excluídos (0)
        const excludedFields = Object.keys(projection).filter(
          (key) => projection[key] === 0
        );
        const includedFields = Object.keys(projection).filter(
          (key) => projection[key] === 1
        );

        if (excludedFields.length > 0) {
          currentTableFields = await this.getTableFields(this.tableName, client);
          const selectedFields = currentTableFields.filter(
            (field: any) => !excludedFields.includes(field)
          );
          selectClause = selectedFields
            .map((field: any) => `"${this.tableName}"."${field}"`)
            .join(", ");
        } else if (includedFields.length > 0) {
          selectClause = includedFields
            .map((field) => `"${this.tableName}".${field}`)
            .join(", ");
        }
      }

      // Implementa o `include` usando JOINs dinâmicos no PostgreSQL
      if (options?.include) {
        const includes = options.include;
        if (!currentTableFields) {
          currentTableFields = await this.getTableFields(this.tableName, client);
        }
        // Itera sobre os relacionamentos especificados em `include`
        for (const relation of Object.keys(includes)) {
          if (includes[relation]) {
            // Assumimos que a relação segue o padrão FK nomeado com a tabela + "Id"
            const relationField = `${relation}Id`;
            const relatedTable = relation === "createdBy" ? "users" : relation;
            const relatedAlias = `${relatedTable}_alias`; // Adiciona um alias único para cada tabela
            const isSameTable = relatedTable === this.tableName;
            // Adiciona o JOIN na consulta

            // Inclui os campos da tabela relacionada no SELECT
            const fieldsRelated = await this.getTableFields(relatedTable, client);
            const relatedFields = fieldsRelated?.filter?.(
              (field) => field !== relationField
            );
            //relacionamentos 1:1
            if (
              relatedFields?.length > 0 &&
              currentTableFields?.includes?.(relationField)
            ) {
              joinClause += ` LEFT JOIN "${relatedTable}" AS "${relatedAlias}" ON "${this.tableName}"."${relationField}" = "${relatedAlias}"."_id"`;

              selectClause +=
                //  isSameTable
                //   ? ""
                //   :
                `, ${relatedFields
                  .filter((field) => field !== "_id")
                  .map(
                    (field) =>
                      `("${relatedAlias}"."${field}") AS "${relatedTable}${field}"`
                  )
                  .join(", ")}`;
            } else {
              //relacionamentos 1:n
              const joinTable = `${this.tableName}${relatedTable}`;
              const joinAlias = `${joinTable}_alias`; // Adiciona um alias único para cada tabela
              const joinTableFields = await this.getTableFields(joinTable, client);
              if (joinTableFields?.length > 0) {
                joinClause += ` LEFT JOIN "${joinTable}" AS "${joinAlias}" ON "${this.tableName}"."_id" = "${joinAlias}"."${this.tableName}Id"`;
                selectClause += isSameTable
                  ? ""
                  : `, ${joinTableFields
                      .filter((field) => field !== "_id")
                      .map(
                        (field) => `("${joinAlias}"."${field}") AS "${joinTable}${field}"`
                      )
                      .join(", ")}`;
              }
            }
          }
        }
      }

      // Monta a query com SELECT e JOINs dinâmicos
      const queryText = `SELECT ${selectClause} FROM "${this.tableName}" ${joinClause} WHERE ${whereClause}`;
      const result = await client.query(queryText, values);

      return returnOneRegister ? result?.rows?.[0] : result?.rows;
    } finally {
      client.release();
    }
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

      let whereClause = "";
      const filterConditions: string[] = [];
      const filterValues: any[] = [];
      Object.keys(fields).forEach((key) => {
        const value = fields[key];
        if (key.includes("initDate")) {
          filterConditions.push(`"${key}" > $${filterValues.length + 1}`);
          filterValues.push(value);
        } else if (key.includes("endDate")) {
          filterConditions.push(`"${key}" < $${filterValues.length + 1}`);
          filterValues.push(value);
        } else if (typeof value === "string" || typeof value === "number") {
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

  async getCount(query: any) {
    const client = await connect();
    try {
      let whereClause = "";
      const filterConditions: string[] = [];
      const filterValues: any[] = [];
      Object.keys(query).forEach((key) => {
        const value = query[key];
        if (key.includes("initDate")) {
          filterConditions.push(`"${key}" > $${filterValues.length + 1}`);
          filterValues.push(value);
        } else if (key.includes("endDate")) {
          filterConditions.push(`"${key}" < $${filterValues.length + 1}`);
          filterValues.push(value);
        } else if (typeof value === "string" || typeof value === "number") {
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

      const queryText = `SELECT COUNT(*) FROM "${this.tableName}" ${whereClause ? `${whereClause}` : ""}`;
      const result = await client.query(queryText, filterValues);
      return result.rows[0].count;
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
}
