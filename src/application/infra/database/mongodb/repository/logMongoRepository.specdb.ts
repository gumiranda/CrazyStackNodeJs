import MockDate from "mockdate";
import { LogMongoRepository } from "./logMongoRepository";
import { MongoHelper } from "@/application/infra";
import { Collection } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("LogMongoRepository", () => {
  let testInstance: LogMongoRepository;
  let errorCollection: Collection;
  let mongo = null;
  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await MongoHelper.connect(uri as string);
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
    await errorCollection.deleteMany({});
    await MongoHelper.disconnect();
  });
  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection("errors");
    testInstance = new LogMongoRepository();
  });
  test("should call logError and generate an error in error collection", async () => {
    await testInstance.logError("any_domain", "any_stack");
    const errors = await errorCollection.find({}).toArray();
    expect(errors.length).toBe(1);
  });
});
