export abstract class Repository {
  abstract add(data: any): Promise<any>;
  abstract insertOne(data: any): Promise<any>;
  abstract update(query: any, data: any): Promise<any>;
  abstract updateOne(query: any, data: any): Promise<any>;
  abstract incrementOne(query: any, data: any): Promise<any>;
  abstract increment(query: any, data: any): Promise<any>;
  abstract deleteOne(query: any): Promise<any>;
  abstract deleteMany(query: any): Promise<any>;
  abstract getOne(query: any, options?: any): Promise<any>;
  abstract getAll(query: any): Promise<any>;
  abstract getPaginate(
    page: number,
    query: any,
    sort: any,
    limit: number,
    projection: any
  ): Promise<any>;
  abstract getCount(query: any): Promise<any>;
  abstract aggregate(query: any): Promise<any>;
}
