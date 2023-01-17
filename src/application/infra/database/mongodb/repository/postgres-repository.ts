import { Repository } from "@/application/infra/contracts";
import { PrismaClient } from "@prisma/client";

export class PostgresRepository extends Repository {
  constructor(private prisma: PrismaClient) {
    super();
  }

  async add(data: any): Promise<any> {
    return this.prisma.post.create({ data });
  }

  async insertOne(data: any): Promise<any> {
    return this.prisma.post.create({ data });
  }

  async update(query: any, data: any): Promise<any> {
    return this.prisma.post.updateMany({ where: query, data });
  }

  async updateOne(query: any, data: any): Promise<any> {
    return this.prisma.post.update({ where: query, data });
  }

  async incrementOne(query: any, data: any): Promise<any> {
    return this.prisma.post.update({ where: query, data });
  }

  async increment(query: any, data: any): Promise<any> {
    return this.prisma.post.updateMany({ where: query, data });
  }

  async deleteOne(query: any): Promise<any> {
    return this.prisma.post.delete({ where: query });
  }

  async deleteMany(query: any): Promise<any> {
    return this.prisma.post.deleteMany({ where: query });
  }

  async getOne(query: any, options?: any): Promise<any> {
    return this.prisma.post.findOne({ where: query, ...options });
  }

  async getAll(query: any): Promise<any> {
    return this.prisma.post.findMany({ where: query });
  }

  async getPaginate(
    page: number,
    query: any,
    sort: any,
    limit: number,
    projection: any
  ): Promise<any> {
    const skip = page * limit;
    return this.prisma.post.findMany({
      where: query,
      skip,
      take: limit,
      orderBy: sort,
      select: projection,
    });
  }

  async getCount(query: any): Promise<any> {
    return this.prisma.post.count({ where: query });
  }

  async aggregate(query: any): Promise<any> {
    return this.prisma.post.aggregate(query);
  }
}
