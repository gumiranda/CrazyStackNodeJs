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
    //await collection.createIndex({ coord: "2dsphere" });

    const { insertedId } = (await this.insertOne(data)) || {};
    if (insertedId) {
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
  async upsertAndPush(query: any, data: any, pushData: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    return collection.findOneAndUpdate(
      mapQueryParamsToQueryMongo(query),
      { $set: mapAnyToMongoObject(data), $push: pushData },
      { upsert: true, session, returnDocument: "after" }
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

    const mongoQuery: any = mapQueryParamsToQueryMongo(query);

    // Inicia a projeção
    const projection: any = {};
    if (options?.projection) {
      for (const [field, value] of Object.entries(options.projection)) {
        projection[field] = value;
      }
    }

    // Inicializa o pipeline para agregar as relações (lookup no MongoDB)
    const pipeline: any[] = [];

    // Adiciona a etapa de projeção (caso exista)
    if (Object.keys(projection).length > 0) {
      pipeline.push({ $project: projection });
    }

    // Implementa os relacionamentos usando lookup
    if (options?.include) {
      for (const relation of Object.keys(options.include)) {
        if (options.include[relation]) {
          const localField = `${relation}Id`; // Assumindo padrão nomeado com "Id"
          const relatedCollection = relation === "createdBy" ? "users" : relation;

          pipeline.push({
            $lookup: {
              from: relatedCollection, // Coleção relacionada
              localField, // Campo local (chave estrangeira)
              foreignField: "_id", // Campo _id da coleção relacionada
              as: relatedCollection, // Nome do campo relacionado no resultado
            },
          });

          // Desestrutura o resultado do lookup (unwind)
          pipeline.push({
            $unwind: {
              path: `$${relatedCollection}`,
              preserveNullAndEmptyArrays: true, // Preserva documentos mesmo sem correspondência
            },
          });
        }
      }
    }

    // Adiciona a etapa de match (filtro) com a query original
    pipeline.push({ $match: mongoQuery });

    // Executa a consulta agregada
    const result = await collection.aggregate(pipeline, { session }).toArray();

    return result.length > 0 ? result[0] : null;
  }

  async getAll(query: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    return collection.find(mapQueryParamsToQueryMongo(query), { session }).toArray();
  }
  async getPaginate(
    page: number,
    query = {},
    sort: any,
    limit = 10,
    projection: any,
    populate: any = null
  ): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();

    // Check if query is a valid object

    const pipeline = [];

    if (Object.keys(projection).length > 0) {
      pipeline.push({ $project: projection });
    }

    const queryMongo = mapQueryParamsToQueryMongo(query) ?? {};
    pipeline.push({ $match: queryMongo });
    if (populate) {
      for (const relation of Object.keys(populate)) {
        if (populate[relation]) {
          const localField = `${relation === "users" ? "user" : relation}Id`;
          const relatedCollection = relation === "createdBy" ? "users" : relation;

          pipeline.push({
            $lookup: {
              from: relatedCollection,
              localField,
              foreignField: "_id",
              as: relatedCollection,
            },
          });

          pipeline.push({
            $unwind: {
              path: `$${relatedCollection}`,
              preserveNullAndEmptyArrays: true,
            },
          });
        }
      }
    }
    if (sort) {
      pipeline.push({ $sort: sort });
    }

    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: limit });

    return collection.aggregate(pipeline, { session }).toArray();
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
