import { LogMongoRepository } from "./logMongoRepository";
import { MongoHelper } from "@/application/infra";
import MockDate from "mockdate";

jest.mock("@/application/infra", () => ({
  MongoHelper: {
    getCollection: jest.fn(),
  },
}));

describe("LogMongoRepository (unit)", () => {
  let testInstance: LogMongoRepository;
  let insertOneMock: jest.Mock;

  beforeAll(() => {
    MockDate.set(new Date());
    insertOneMock = jest.fn().mockResolvedValue({});
    (MongoHelper.getCollection as jest.Mock).mockResolvedValue({
      insertOne: insertOneMock,
    });
  });

  afterAll(() => {
    MockDate.reset();
  });

  beforeEach(() => {
    testInstance = new LogMongoRepository();
    insertOneMock.mockClear();
    (MongoHelper.getCollection as jest.Mock).mockClear();
    (MongoHelper.getCollection as jest.Mock).mockResolvedValue({
      insertOne: insertOneMock,
    });
  });

  it("should call MongoHelper.getCollection with 'errors'", async () => {
    await testInstance.logError("any_domain", "any_stack");
    expect(MongoHelper.getCollection).toHaveBeenCalledWith("errors");
    expect(MongoHelper.getCollection).toHaveBeenCalledTimes(1);
  });

  it("should call insertOne with correct values", async () => {
    await testInstance.logError("any_domain", "any_stack");
    expect(insertOneMock).toHaveBeenCalledWith({
      domain: "any_domain",
      stack: "any_stack",
      date: new Date(),
    });
    expect(insertOneMock).toHaveBeenCalledTimes(1);
  });

  it("should rethrow if getCollection throws", async () => {
    (MongoHelper.getCollection as jest.Mock).mockRejectedValueOnce(
      new Error("mongo_error")
    );
    await expect(
      testInstance.logError("any_domain", "any_stack")
    ).rejects.toThrow("mongo_error");
  });

  it("should rethrow if insertOne throws", async () => {
    insertOneMock.mockRejectedValueOnce(new Error("insert_error"));
    await expect(
      testInstance.logError("any_domain", "any_stack")
    ).rejects.toThrow("insert_error");
  });
});
