import { Repository } from "@/application/infra/contracts";

export class PostgresSqlPureRepository extends Repository {
  override incrementOne(query: any, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  override increment(query: any, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  override deleteOne(query: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  override deleteMany(query: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  override getOne(query: any, options?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  override getAll(query: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  override getPaginate(
    page: number,
    query: any,
    sort: any,
    limit: number,
    projection: any
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  override getCount(query: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  override aggregate(query: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  private connection: any;
  constructor(connection: any) {
    super();
    this.connection = connection;
  }
  async add(data: any): Promise<any> {
    const query = `INSERT INTO ${data.table} (${Object.keys(
      data.values
    ).toString()}) VALUES (${Object.values(data.values)
      .map((value: any) => "${value}")
      .toString()})`;
    return this.connection.query(query);
  }

  async insertOne(data: any): Promise<any> {
    const { table, values } = data;
    const keys = Object.keys(values);
    const query = `INSERT INTO ${table} (${keys.toString()}) VALUES (${keys
      .map((key: any) => "${values[key]}")
      .toString()}) RETURNING * `;
    return this.connection.query(query);
  }

  async update(query: any, data: any): Promise<any> {
    const values = Object.entries(data.values)
      .map(([key, value]: any) => `${key} = '${value}'`)
      .join(",");
    const where = Object.entries(query)
      .map(([key, value]: any) => `${key} = ${value} `)
      .join(" AND ");
    const finalQuery = `UPDATE ${data.table} SET ${values} WHERE ${where}`;
    return this.connection.query(finalQuery);
  }

  async updateOne(query: any, data: any): Promise<any> {
    const values = Object.entries(data.values)
      .map(([key, value]: any) => `${key} = '${value}'`)
      .join(",");
    const where = Object.entries(query)
      .map(([key, value]: any) => `${key} = '${value}'`)
      .join(" AND ");
    const finalQuery = `UPDATE ${data.table} SET ${values} WHERE ${where} RETURNING *`;
    return this.connection.query(finalQuery);
  }
}
