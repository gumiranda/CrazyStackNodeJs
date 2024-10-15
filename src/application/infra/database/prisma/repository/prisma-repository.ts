import { Repository } from "@/application/infra/contracts";
import { prisma } from "../prisma";

export class PrismaRepository extends Repository {
  private tableName: any;

  constructor(tableName: string) {
    super();
    this.tableName = (prisma as any)[tableName]; // Conecta a tabela do Prisma
  }

  async add(data: any): Promise<any> {
    const inserted = (await this.insertOne(data)) || {};
    return inserted;
  }
  async insertOne(data: any): Promise<any> {
    const inserted = await this.tableName.create({
      data,
    });
    return inserted;
  }
  async incrementOne(query: any, data: any): Promise<any> {
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
    return incremented;
  }
  async updateOne(_id: any, data: any): Promise<any> {
    const updated = await this.tableName.update({
      where: { _id },
      data,
    });
    return updated;
  }

  async update(query: any, data: any): Promise<any> {
    const updated = await this.tableName.updateMany({
      where: query,
      data,
    });
    return updated;
  }

  async upsertAndPush(query: any, data: any, pushData: any): Promise<any> {
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
    return result;
  }

  async increment(query: any, data: any): Promise<any> {
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
    return incremented.count;
  }

  async deleteMany(query: any): Promise<any> {
    const deleted = await this.tableName.deleteMany({
      where: query,
    });
    return deleted.count;
  }

  async deleteOne(fields: any): Promise<any> {
    return this.deleteMany(fields);
  }

  async getOne(query: any): Promise<any> {
    const record = await this.tableName.findFirst({
      where: query,
    });
    return record;
  }

  async getAll(): Promise<any[]> {
    const records = await this.tableName.findMany();
    return records;
  }

  async getPaginate(
    page = 0,
    fields: any,
    sort: any,
    limit = 10,
    projection: any
  ): Promise<any[]> {
    const skip = (page - 1) * limit;
    const records = await this.tableName.findMany({
      where: fields,
      select: projection,
      orderBy: sort,
      take: limit,
      skip,
    });
    return records;
  }

  async getCount(query: any): Promise<number> {
    const count = await this.tableName.count({
      where: query,
    });
    return count;
  }

  async aggregate(query: any): Promise<any> {
    // Dependendo do tipo de agregação, você pode utilizar a função `aggregate` do Prisma
    const result = await this.tableName.aggregate(query);
    return result;
  }
}
