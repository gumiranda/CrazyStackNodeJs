import {
  mapAnyToMongoObject,
  mapQueryParamsToQueryMongo,
  MongoHelper,
} from "@/application/infra/database/mongodb";
import { Repository } from "@/application/infra/contracts/repository";
import { Collection, ObjectId } from "mongodb";

export class MongoRepository extends Repository {
  async deleteMany(query: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    const result = (await collection.deleteMany(mapQueryParamsToQueryMongo(query), {
      session,
    })) as any;
    if (result?.deletedCount > 0) {
      return true;
    }
    return false;
  }
  public collectionName: string;
  constructor(collectionName: string) {
    super();
    this.collectionName = collectionName;
  }
  private async getCollection(): Promise<Collection> {
    return MongoHelper.getCollection(this.collectionName);
  }
  async insertOne(data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    return collection.insertOne(mapAnyToMongoObject(data), { session });
  }
  async add(data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    const { insertedId } = (await this.insertOne(data)) || {};
    if (!!insertedId) {
      const objInserted = await collection.findOne(
        { _id: new ObjectId(insertedId) },
        { session }
      );
      return MongoHelper.mapPassword(objInserted);
    }
    return null;
  }
  async updateOne(query: any, data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    return collection.updateOne(
      mapQueryParamsToQueryMongo(query),
      { $set: mapAnyToMongoObject(data) },
      { upsert: false, session }
    );
  }
  async update(query: any, data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    const result = await this.updateOne(query, data);
    if (result?.modifiedCount === 1) {
      return collection.findOne(mapQueryParamsToQueryMongo(query), { session });
    }
    return null;
  }
  async incrementOne(query: any, data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    return collection.updateOne(
      mapQueryParamsToQueryMongo(query),
      { $inc: mapAnyToMongoObject(data) },
      { upsert: false, session }
    );
  }
  async increment(query: any, data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    const result = await this.incrementOne(query, data);
    if (result?.modifiedCount === 1) {
      return collection.findOne(mapQueryParamsToQueryMongo(query), { session });
    }
    return null;
  }
  async deleteOne(query: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    const result = (await collection.deleteOne(mapQueryParamsToQueryMongo(query), {
      session,
    })) as any;
    if (result?.deletedCount === 1) {
      return true;
    }
    return false;
  }
  async getOne(query: any, options?: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query?._id) {
      query._id = new ObjectId(query._id);
    }
    return collection.findOne(mapQueryParamsToQueryMongo(query), {
      ...options,
      session,
    });
  }
  async getAll(query: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    return collection.find(mapQueryParamsToQueryMongo(query), { session }).toArray();
  }
  async getPaginate(
    page: number,
    query: any,
    sort: any,
    limit: number,
    projection: any
  ): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    return collection
      .find(mapQueryParamsToQueryMongo(query), { session })
      .project(projection)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort)
      .toArray();
  }
  async getCount(query: any): Promise<any> {
    const collection = await this.getCollection();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    return collection.countDocuments(mapQueryParamsToQueryMongo(query));
  }
  async aggregate(query: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    return collection.aggregate(query, { session }).toArray();
  }
}
