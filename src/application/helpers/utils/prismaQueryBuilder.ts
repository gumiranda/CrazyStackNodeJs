import { PrismaClient } from "@prisma/client";

export class PrismaQueryBuilder {
  private readonly prisma: PrismaClient;
  private model: string;
  private whereClause: any = {};
  private orderBy: any = {};
  private skipCount: number = 0;
  private limitCount: number = 0;
  private selectFields: any = {};
  private groupByFields: any = [];

  constructor(prisma: PrismaClient, model: string) {
    this.prisma = prisma;
    this.model = model;
  }

  match(data: any): PrismaQueryBuilder {
    this.whereClause = { ...this.whereClause, ...data };
    return this;
  }

  group(fields: any): PrismaQueryBuilder {
    this.groupByFields = [...fields];
    return this;
  }

  count(field: string): PrismaQueryBuilder {
    this.selectFields._count = { [field]: true };
    return this;
  }

  project(fields: any): PrismaQueryBuilder {
    this.selectFields = { ...this.selectFields, ...fields };
    return this;
  }

  skip(data: number): PrismaQueryBuilder {
    this.skipCount = data;
    return this;
  }

  limit(data: number): PrismaQueryBuilder {
    this.limitCount = data;
    return this;
  }

  sort(data: any): PrismaQueryBuilder {
    this.orderBy = { ...data };
    return this;
  }

  private rawSQL: string = "";

  customSQL(query: string): PrismaQueryBuilder {
    this.rawSQL = query;
    return this;
  }

  async build() {
    if (this.rawSQL) {
      const result = await this.prisma.$queryRawUnsafe(this.rawSQL);
      return result;
    }

    // Consulta normal com Prisma
    const queryOptions: any = {
      where: this.whereClause,
      orderBy: this.orderBy,
      skip: this.skipCount,
      take: this.limitCount,
      select: this.selectFields,
    };

    if (this.groupByFields.length > 0) {
      queryOptions["groupBy"] = this.groupByFields;
    }

    const result = await (this.prisma as any)[this.model].findMany(queryOptions);
    return result;
  }
}
/*
const prisma = new PrismaClient();

const queryBuilder = new PrismaQueryBuilder(prisma, 'User')
  .match({ age: { gte: 18 } })
  .sort({ createdAt: 'desc' })
  .skip(0)
  .limit(10)
  .build();

const result = await queryBuilder;
console.log(result);
gpt doidodev0@gmail.com
*/
