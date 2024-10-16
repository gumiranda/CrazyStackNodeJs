import { Repository } from "@/application/infra/contracts";
import { prisma } from "../prisma";

export class PrismaRepository extends Repository {
  private tableName: any;
  constructor(tableName: string) {
    super();
    this.tableName = (prisma as any)[tableName];
  }
  private mapId(query: any) {
    if (query?._id) {
      query.id = query._id;
      delete query._id;
    }
    return query;
  }
  private mapSortOrder(sort: any) {
    return Object.keys(sort).reduce((acc: any, key: string) => {
      acc[key] = sort[key] === 1 ? "asc" : "desc";
      return acc;
    }, {});
  }
  private mapReturnId(record: any) {
    if (record && record.id) {
      record._id = record.id;
      delete record.id;
    }
    return record;
  }
  private mapReturnIds(records: any[]) {
    return records?.map?.((record) => this.mapReturnId(record));
  }
  async add(data: any): Promise<any> {
    const inserted = await this.insertOne({ data });
    return this.mapReturnId(inserted);
  }
  async insertOne(data: any): Promise<any> {
    const inserted = await this.tableName.create({ data });
    return inserted;
  }
  async update(query: any, data: any): Promise<any> {
    query = this.mapId(query);
    const updated = await this.tableName.updateMany({ where: query, data });
    return this.mapReturnIds(updated);
  }
  async updateOne(_id: any, data: any): Promise<any> {
    const query = this.mapId({ _id });
    const updated = await this.tableName.update({
      where: query,
      data,
    });
    return this.mapReturnId(updated);
  }
  async upsertAndPush(query: any, data: any, pushData: any): Promise<any> {
    query = this.mapId(query);
    const keyToPush = Object.keys(pushData)[0];
    const valueToPush = pushData[keyToPush];

    const result = await this.tableName.upsert({
      where: query,
      update: {
        [keyToPush]: {
          push: valueToPush,
        },
      },
      create: {
        ...query,
        ...data,
      },
    });
    return this.mapReturnId(result);
  }
  async incrementOne(query: any, data: any): Promise<any> {
    query = this.mapId(query);
    const incremented = await this.tableName.update({
      where: query,
      data: {
        ...Object.keys(data).reduce(
          (acc: { [key: string]: any }, key) => {
            acc[key] = { increment: data[key] };
            return acc;
          },
          {} as { [key: string]: any }
        ),
      },
    });
    return this.mapReturnId(incremented);
  }
  async increment(query: any, data: any): Promise<any> {
    query = this.mapId(query);
    const incremented = await this.tableName.updateMany({
      where: query,
      data: {
        ...Object.keys(data).reduce(
          (acc: { [key: string]: any }, key) => {
            acc[key] = { increment: data[key] };
            return acc;
          },
          {} as { [key: string]: any }
        ),
      },
    });
    //return this.mapReturnId(incremented);
    return incremented.count;
  }
  async deleteMany(query: any): Promise<any> {
    query = this.mapId(query);
    const deleted = await this.tableName.deleteMany({
      where: query,
    });
    return deleted.count;
  }

  async deleteOne(fields: any): Promise<any> {
    return this.deleteMany(fields);
  }
  async getOne(query: any): Promise<any> {
    query = this.mapId(query);
    const record = await this.tableName.findFirst({
      where: query,
    });
    return this.mapReturnId(record);
  }

  async getAll(): Promise<any[]> {
    const records = await this.tableName.findMany();
    return this.mapReturnIds(records);
  }
  async getPaginate(
    page: number,
    fields: any,
    sort: any,
    limit: number,
    projection: any
  ): Promise<any> {
    const skip = (page - 1) * limit;
    fields = this.mapId(fields);
    const query = { where: fields, orderBy: this.mapSortOrder(sort), take: limit, skip };
    const queryFinal =
      Object.keys(projection).length === 0 ? query : { ...query, select: projection };
    const records = await this.tableName.findMany(queryFinal);
    return this.mapReturnIds(records);
  }
  async getCount(query: any): Promise<any> {
    query = this.mapId(query);
    const count = await this.tableName.count({
      where: query,
    });
    return count;
  }
  async aggregate(query: any): Promise<any> {
    query = this.mapId(query);
    const result = await this.tableName.aggregate(query);
    return result;
  }
}
