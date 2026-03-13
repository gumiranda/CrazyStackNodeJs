import { describe, test, expect, beforeEach, jest, mock } from "bun:test";
import { ObjectId } from "mongodb";

const mockInsertOne = jest.fn();
const mockFindOne = jest.fn();
const mockUpdateOne = jest.fn();
const mockDeleteOne = jest.fn();
const mockDeleteMany = jest.fn();
const mockFind = jest.fn();
const mockCountDocuments = jest.fn();
const mockAggregate = jest.fn();
const mockFindOneAndUpdate = jest.fn();
const mockToArray = jest.fn();

mock.module("@/application/infra/database/mongodb", () => ({
  MongoHelper: {
    getCollection: jest.fn().mockImplementation(async () => ({
      insertOne: mockInsertOne,
      findOne: mockFindOne,
      updateOne: mockUpdateOne,
      deleteOne: mockDeleteOne,
      deleteMany: mockDeleteMany,
      find: mockFind,
      countDocuments: mockCountDocuments,
      aggregate: mockAggregate,
      findOneAndUpdate: mockFindOneAndUpdate,
    })),
    getSession: jest.fn().mockResolvedValue(null),
    mapPassword: jest.fn((obj: any) => ({ ...obj, password: null })),
  },
  mapAnyToMongoObject: jest.fn((data: any) => data),
  mapQueryParamsToQueryMongo: jest.fn((query: any) => query),
}));

import { MongoRepository } from "./mongo-repository";

describe("MongoRepository", () => {
  let repository: MongoRepository;
  let fakeId: string;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new MongoRepository("test_collection");
    fakeId = new ObjectId().toHexString();
    // Re-setup default return values after clearAllMocks
    mockFind.mockReturnValue({ toArray: mockToArray });
    mockAggregate.mockReturnValue({ toArray: mockToArray });
  });

  describe("constructor", () => {
    test("should set collectionName", () => {
      expect(repository.collectionName).toBe("test_collection");
    });
  });

  describe("insertOne", () => {
    test("should call collection.insertOne with mapped data", async () => {
      const data = { name: "test" };
      mockInsertOne.mockResolvedValueOnce({ insertedId: fakeId });
      await repository.insertOne(data);
      expect(mockInsertOne).toHaveBeenCalledWith(data, { session: null });
    });
  });

  describe("add", () => {
    test("should insert and return the inserted document with password mapped", async () => {
      const data = { name: "test" };
      const insertedId = new ObjectId();
      mockInsertOne.mockResolvedValueOnce({ insertedId });
      const result = await repository.add(data);
      expect(result).toEqual({ name: "test", _id: insertedId, password: null });
      expect(mockFindOne).not.toHaveBeenCalled();
    });

    test("should return null when insertOne returns no insertedId", async () => {
      mockInsertOne.mockResolvedValueOnce({});
      const result = await repository.add({ name: "test" });
      expect(result).toBeNull();
    });

    test("should return null when insertOne returns null", async () => {
      mockInsertOne.mockResolvedValueOnce(null);
      const result = await repository.add({ name: "test" });
      expect(result).toBeNull();
    });
  });

  describe("updateOne", () => {
    test("should call collection.updateOne with mapped query and data", async () => {
      const query = { name: "test" };
      const data = { name: "updated" };
      mockUpdateOne.mockResolvedValueOnce({ modifiedCount: 1 });
      await repository.updateOne(query, data);
      expect(mockUpdateOne).toHaveBeenCalledWith(
        query,
        { $set: data },
        { upsert: false, session: null }
      );
    });

    test("should convert _id to ObjectId in query", async () => {
      const query = { _id: fakeId };
      const data = { name: "updated" };
      mockUpdateOne.mockResolvedValueOnce({ modifiedCount: 1 });
      await repository.updateOne(query, data);
      expect(mockUpdateOne).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    test("should return updated document when modifiedCount is 1", async () => {
      const query = { name: "test" };
      const data = { name: "updated" };
      mockUpdateOne.mockResolvedValueOnce({ modifiedCount: 1 });
      const expectedDoc = { _id: "abc", name: "updated" };
      mockFindOne.mockResolvedValueOnce(expectedDoc);
      const result = await repository.update(query, data);
      expect(result).toEqual(expectedDoc);
    });

    test("should return null when modifiedCount is not 1", async () => {
      const query = { name: "test" };
      const data = { name: "updated" };
      mockUpdateOne.mockResolvedValueOnce({ modifiedCount: 0 });
      const result = await repository.update(query, data);
      expect(result).toBeNull();
    });
  });

  describe("deleteOne", () => {
    test("should return true when deletedCount is 1", async () => {
      mockDeleteOne.mockResolvedValueOnce({ deletedCount: 1 });
      const result = await repository.deleteOne({ name: "test" });
      expect(result).toBe(true);
    });

    test("should return false when deletedCount is 0", async () => {
      mockDeleteOne.mockResolvedValueOnce({ deletedCount: 0 });
      const result = await repository.deleteOne({ name: "test" });
      expect(result).toBe(false);
    });

    test("should convert _id to ObjectId", async () => {
      mockDeleteOne.mockResolvedValueOnce({ deletedCount: 1 });
      await repository.deleteOne({ _id: fakeId });
      expect(mockDeleteOne).toHaveBeenCalled();
    });
  });

  describe("deleteMany", () => {
    test("should return true when deletedCount > 0", async () => {
      mockDeleteMany.mockResolvedValueOnce({ deletedCount: 3 });
      const result = await repository.deleteMany({ active: false });
      expect(result).toBe(true);
    });

    test("should return false when deletedCount is 0", async () => {
      mockDeleteMany.mockResolvedValueOnce({ deletedCount: 0 });
      const result = await repository.deleteMany({ active: false });
      expect(result).toBe(false);
    });

    test("should convert _id to ObjectId", async () => {
      mockDeleteMany.mockResolvedValueOnce({ deletedCount: 1 });
      await repository.deleteMany({ _id: fakeId });
      expect(mockDeleteMany).toHaveBeenCalled();
    });
  });

  describe("getOne", () => {
    test("should return the first document matching the query", async () => {
      const fakeDoc = { _id: "abc", name: "test" };
      mockToArray.mockResolvedValueOnce([fakeDoc]);
      const result = await repository.getOne({ name: "test" });
      expect(result).toEqual(fakeDoc);
    });

    test("should return null when no document matches", async () => {
      mockToArray.mockResolvedValueOnce([]);
      const result = await repository.getOne({ name: "nonexistent" });
      expect(result).toBeNull();
    });

    test("should convert _id to ObjectId", async () => {
      mockToArray.mockResolvedValueOnce([{ _id: fakeId }]);
      await repository.getOne({ _id: fakeId });
      expect(mockAggregate).toHaveBeenCalled();
    });

    test("should apply projection when provided", async () => {
      mockToArray.mockResolvedValueOnce([{ _id: "abc", name: "test" }]);
      await repository.getOne({ name: "test" }, { projection: { password: 0 } });
      expect(mockAggregate).toHaveBeenCalled();
    });

    test("should apply include/lookup when provided", async () => {
      mockToArray.mockResolvedValueOnce([{ _id: "abc", name: "test" }]);
      await repository.getOne({ name: "test" }, { include: { createdBy: true } });
      expect(mockAggregate).toHaveBeenCalled();
      const pipeline = mockAggregate.mock.calls[0][0];
      const lookupStage = pipeline.find((s: any) => s.$lookup);
      expect(lookupStage).toBeTruthy();
      expect(lookupStage.$lookup.from).toBe("users");
    });

    test("should skip include/lookup when relation value is false", async () => {
      mockToArray.mockResolvedValueOnce([{ _id: "abc", name: "test" }]);
      await repository.getOne({ name: "test" }, { include: { createdBy: false } });
      const pipeline = mockAggregate.mock.calls[0][0];
      const lookupStage = pipeline.find((s: any) => s.$lookup);
      expect(lookupStage).toBeUndefined();
    });

    test("should use relation name as collection when not createdBy", async () => {
      mockToArray.mockResolvedValueOnce([{ _id: "abc", name: "test" }]);
      await repository.getOne({ name: "test" }, { include: { category: true } });
      const pipeline = mockAggregate.mock.calls[0][0];
      const lookupStage = pipeline.find((s: any) => s.$lookup);
      expect(lookupStage.$lookup.from).toBe("category");
      expect(lookupStage.$lookup.localField).toBe("categoryId");
    });

    test("should not add projection when options has no projection", async () => {
      mockToArray.mockResolvedValueOnce([{ _id: "abc" }]);
      await repository.getOne({ name: "test" }, {});
      const pipeline = mockAggregate.mock.calls[0][0];
      const projectStage = pipeline.find((s: any) => s.$project);
      expect(projectStage).toBeUndefined();
    });
  });

  describe("getAll", () => {
    test("should return all documents matching query", async () => {
      const fakeDocs = [{ _id: "1" }, { _id: "2" }];
      mockToArray.mockResolvedValueOnce(fakeDocs);
      const result = await repository.getAll({ active: true });
      expect(result).toEqual(fakeDocs);
      expect(mockFind).toHaveBeenCalledWith({ active: true }, { session: null });
    });
  });

  describe("getPaginate", () => {
    test("should return paginated results", async () => {
      const fakeDocs = [{ _id: "1" }, { _id: "2" }];
      mockToArray.mockResolvedValueOnce(fakeDocs);
      const result = await repository.getPaginate(
        1,
        { active: true },
        { createdAt: -1 },
        10,
        {}
      );
      expect(result).toEqual(fakeDocs);
    });

    test("should apply projection when provided", async () => {
      mockToArray.mockResolvedValueOnce([]);
      await repository.getPaginate(
        1,
        {},
        { createdAt: -1 },
        10,
        { password: 0 }
      );
      expect(mockAggregate).toHaveBeenCalled();
    });

    test("should apply populate/lookup when provided", async () => {
      mockToArray.mockResolvedValueOnce([]);
      await repository.getPaginate(
        1,
        {},
        { createdAt: -1 },
        10,
        {},
        { createdBy: true }
      );
      expect(mockAggregate).toHaveBeenCalled();
      const pipeline = mockAggregate.mock.calls[0][0];
      const lookupStage = pipeline.find((s: any) => s.$lookup);
      expect(lookupStage).toBeTruthy();
    });

    test("should skip populate when populate is null", async () => {
      mockToArray.mockResolvedValueOnce([{ _id: "1" }]);
      const result = await repository.getPaginate(
        1,
        {},
        { createdAt: -1 },
        10,
        {},
        null
      );
      expect(result).toEqual([{ _id: "1" }]);
      const pipeline = mockAggregate.mock.calls[0][0];
      const lookupStage = pipeline.find((s: any) => s.$lookup);
      expect(lookupStage).toBeUndefined();
    });

    test("should skip populate relation when value is false", async () => {
      mockToArray.mockResolvedValueOnce([]);
      await repository.getPaginate(
        1,
        {},
        { createdAt: -1 },
        10,
        {},
        { createdBy: false }
      );
      const pipeline = mockAggregate.mock.calls[0][0];
      const lookupStage = pipeline.find((s: any) => s.$lookup);
      expect(lookupStage).toBeUndefined();
    });

    test("should use 'user' prefix for users relation in populate localField", async () => {
      mockToArray.mockResolvedValueOnce([]);
      await repository.getPaginate(
        1,
        {},
        { createdAt: -1 },
        10,
        {},
        { users: true }
      );
      const pipeline = mockAggregate.mock.calls[0][0];
      const lookupStage = pipeline.find((s: any) => s.$lookup);
      expect(lookupStage.$lookup.localField).toBe("userId");
      expect(lookupStage.$lookup.from).toBe("users");
    });

    test("should use relation name for non-users populate", async () => {
      mockToArray.mockResolvedValueOnce([]);
      await repository.getPaginate(
        1,
        {},
        { createdAt: -1 },
        10,
        {},
        { category: true }
      );
      const pipeline = mockAggregate.mock.calls[0][0];
      const lookupStage = pipeline.find((s: any) => s.$lookup);
      expect(lookupStage.$lookup.localField).toBe("categoryId");
      expect(lookupStage.$lookup.from).toBe("category");
    });

    test("should handle null from mapQueryParamsToQueryMongo in getPaginate", async () => {
      const { mapQueryParamsToQueryMongo } = require("@/application/infra/database/mongodb");
      mapQueryParamsToQueryMongo.mockReturnValueOnce(null);
      mockToArray.mockResolvedValueOnce([]);
      await repository.getPaginate(1, {}, { createdAt: -1 }, 10, {});
      expect(mockAggregate).toHaveBeenCalled();
    });

    test("should handle null sort", async () => {
      mockToArray.mockResolvedValueOnce([]);
      await repository.getPaginate(1, {}, null, 10, {});
      const pipeline = mockAggregate.mock.calls[0][0];
      const sortStage = pipeline.find((s: any) => s.$sort);
      expect(sortStage).toBeUndefined();
    });

    test("should use default query and limit when not provided", async () => {
      mockToArray.mockResolvedValueOnce([]);
      await repository.getPaginate(1, undefined as any, { createdAt: -1 }, undefined as any, {});
      expect(mockAggregate).toHaveBeenCalled();
    });
  });

  describe("getCount", () => {
    test("should return count of documents", async () => {
      mockCountDocuments.mockResolvedValueOnce(5);
      const result = await repository.getCount({ active: true });
      expect(result).toBe(5);
    });

    test("should convert _id to ObjectId", async () => {
      mockCountDocuments.mockResolvedValueOnce(1);
      await repository.getCount({ _id: fakeId });
      expect(mockCountDocuments).toHaveBeenCalled();
    });
  });

  describe("aggregate", () => {
    test("should return aggregated results", async () => {
      const fakeResults = [{ total: 100 }];
      mockToArray.mockResolvedValueOnce(fakeResults);
      const pipeline = [{ $match: { active: true } }];
      const result = await repository.aggregate(pipeline);
      expect(result).toEqual(fakeResults);
      expect(mockAggregate).toHaveBeenCalledWith(pipeline, { session: null });
    });
  });

  describe("increment", () => {
    test("should return updated document when modifiedCount is 1", async () => {
      mockUpdateOne.mockResolvedValueOnce({ modifiedCount: 1 });
      const expectedDoc = { _id: "abc", views: 6 };
      mockFindOne.mockResolvedValueOnce(expectedDoc);
      const result = await repository.increment({ name: "test" }, { views: 1 });
      expect(result).toEqual(expectedDoc);
    });

    test("should return null when modifiedCount is not 1", async () => {
      mockUpdateOne.mockResolvedValueOnce({ modifiedCount: 0 });
      const result = await repository.increment({ name: "test" }, { views: 1 });
      expect(result).toBeNull();
    });

    test("should convert _id to ObjectId in incrementOne", async () => {
      mockUpdateOne.mockResolvedValueOnce({ modifiedCount: 1 });
      mockFindOne.mockResolvedValueOnce({ _id: fakeId, views: 2 });
      await repository.incrementOne({ _id: fakeId }, { views: 1 });
      expect(mockUpdateOne).toHaveBeenCalled();
    });
  });

  describe("upsertAndPush", () => {
    test("should call findOneAndUpdate with correct parameters", async () => {
      const query = { name: "test" };
      const data = { updatedAt: new Date() };
      const pushData = { tags: "newTag" };
      mockFindOneAndUpdate.mockResolvedValueOnce({ _id: "abc", name: "test", tags: ["newTag"] });
      const result = await repository.upsertAndPush(query, data, pushData);
      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        query,
        { $set: data, $push: pushData },
        { upsert: true, session: null, returnDocument: "after" }
      );
      expect(result).toEqual({ _id: "abc", name: "test", tags: ["newTag"] });
    });

    test("should convert _id to ObjectId in query", async () => {
      mockFindOneAndUpdate.mockResolvedValueOnce({ _id: fakeId });
      await repository.upsertAndPush(
        { _id: fakeId },
        { updatedAt: new Date() },
        { tags: "tag" }
      );
      expect(mockFindOneAndUpdate).toHaveBeenCalled();
    });
  });
});
