import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { mock, MockProxy } from "jest-mock-extended";
import { UserAggregateRepository } from "./UserAggregateRepository";
import MockDate from "mockdate";

jest.mock("@/application/infra/database/mongodb", () => ({
  mapQueryParamsToQueryMongo: jest.fn((query: any) => query),
  mountGeoNearQuery: jest.fn((params: any) => {
    if (!params) return null;
    return {
      near: { type: "Point", coordinates: params.coordinates },
      query: params.query,
      distanceField: "distance",
      spherical: true,
      maxDistance: 20000000,
    };
  }),
}));

describe("UserAggregateRepository", () => {
  let testInstance: UserAggregateRepository;
  let repository: MockProxy<Repository>;
  let fakeQuery: Query;
  const fakeUsers = [
    { _id: "1", name: "user1" },
    { _id: "2", name: "user2" },
  ];

  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  beforeEach(() => {
    repository = mock<Repository>();
    repository.getOne.mockResolvedValue({
      coord: { type: "Point", coordinates: [10, 20] },
    });
    repository.getPaginate.mockResolvedValue(fakeUsers);
    repository.getCount.mockResolvedValue(2);
    repository.aggregate.mockResolvedValue(fakeUsers);
    testInstance = new UserAggregateRepository(repository);
    fakeQuery = {
      fields: { name: "test" },
      options: { userLoggedId: "507f1f77bcf86cd799439011", page: 1 },
    };
  });

  test("should return null when userLoggedId is not provided", async () => {
    const query: Query = { fields: {}, options: {} };
    const result = await testInstance.loadUserByPageGeoNear(query);
    expect(result).toBeNull();
  });

  test("should return null when query options is undefined", async () => {
    const query: Query = { fields: {} } as any;
    const result = await testInstance.loadUserByPageGeoNear(query);
    expect(result).toBeNull();
  });

  test("should return paginated results when $text query is present", async () => {
    const { mapQueryParamsToQueryMongo } = require("@/application/infra/database/mongodb");
    mapQueryParamsToQueryMongo.mockReturnValueOnce({
      $text: { $search: "test" },
      active: true,
    });
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toEqual({ users: fakeUsers, total: 2 });
    expect(repository.getPaginate).toHaveBeenCalledTimes(1);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });

  test("should return null when coord has no coordinates", async () => {
    repository.getOne.mockResolvedValueOnce({ coord: {} });
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toBeNull();
  });

  test("should return null when getOne returns null (no coord)", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toBeNull();
  });

  test("should return geo near results when coordinates exist", async () => {
    repository.aggregate
      .mockResolvedValueOnce(fakeUsers)
      .mockResolvedValueOnce([{ name: 5 }]);
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toEqual({ users: fakeUsers, total: 5 });
    expect(repository.aggregate).toHaveBeenCalledTimes(2);
  });

  test("should return total 0 when aggregate for count returns null", async () => {
    repository.aggregate
      .mockResolvedValueOnce(fakeUsers)
      .mockResolvedValueOnce(null);
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toEqual({ users: fakeUsers, total: 0 });
  });

  test("should return total 0 when aggregate for count returns empty array", async () => {
    repository.aggregate
      .mockResolvedValueOnce(fakeUsers)
      .mockResolvedValueOnce([]);
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toEqual({ users: fakeUsers, total: 0 });
  });

  test("should rethrow if repository.getOne throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("getOne error"));
    await expect(testInstance.loadUserByPageGeoNear(fakeQuery)).rejects.toThrow(
      "getOne error"
    );
  });

  test("should rethrow if repository.aggregate throws", async () => {
    repository.aggregate.mockRejectedValueOnce(new Error("aggregate error"));
    await expect(testInstance.loadUserByPageGeoNear(fakeQuery)).rejects.toThrow(
      "aggregate error"
    );
  });

  test("should use default page 0 when page is not provided", async () => {
    const { mapQueryParamsToQueryMongo } = require("@/application/infra/database/mongodb");
    mapQueryParamsToQueryMongo.mockReturnValueOnce({
      $text: { $search: "test" },
      active: true,
    });
    fakeQuery.options = { userLoggedId: "507f1f77bcf86cd799439011" };
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toEqual({ users: fakeUsers, total: 2 });
  });

  test("should return empty users array when getPaginate returns empty", async () => {
    const { mapQueryParamsToQueryMongo } = require("@/application/infra/database/mongodb");
    mapQueryParamsToQueryMongo.mockReturnValueOnce({
      $text: { $search: "test" },
      active: true,
    });
    repository.getPaginate.mockResolvedValueOnce([]);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toEqual({ users: [], total: 0 });
  });

  test("should use default sort when sort is not provided", async () => {
    const { mapQueryParamsToQueryMongo } = require("@/application/infra/database/mongodb");
    mapQueryParamsToQueryMongo.mockReturnValueOnce({
      $text: { $search: "test" },
      active: true,
    });
    fakeQuery.options = { userLoggedId: "507f1f77bcf86cd799439011" };
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toBeDefined();
    expect(repository.getPaginate).toHaveBeenCalledWith(
      0,
      expect.any(Object),
      { createdAt: -1 },
      10,
      {}
    );
  });

  test("should use default projection when projection is not provided", async () => {
    repository.aggregate
      .mockResolvedValueOnce(fakeUsers)
      .mockResolvedValueOnce([{ name: 3 }]);
    fakeQuery.options = { userLoggedId: "507f1f77bcf86cd799439011", page: 1 };
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toBeDefined();
  });

  test("should handle null getCount in $text branch", async () => {
    const { mapQueryParamsToQueryMongo } = require("@/application/infra/database/mongodb");
    mapQueryParamsToQueryMongo.mockReturnValueOnce({
      $text: { $search: "test" },
      active: true,
    });
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(null);
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toEqual({ users: [], total: 0 });
  });

  test("should use custom sort and projection in $text branch when provided", async () => {
    const { mapQueryParamsToQueryMongo } = require("@/application/infra/database/mongodb");
    mapQueryParamsToQueryMongo.mockReturnValueOnce({
      $text: { $search: "test" },
      active: true,
    });
    fakeQuery.options = {
      userLoggedId: "507f1f77bcf86cd799439011",
      page: 2,
      sort: { name: 1 },
      projection: { name: 1 },
    };
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toBeDefined();
    expect(repository.getPaginate).toHaveBeenCalledWith(
      2,
      expect.any(Object),
      { name: 1 },
      10,
      { name: 1 }
    );
  });

  test("should handle null fields in query", async () => {
    fakeQuery.fields = null as any;
    repository.aggregate
      .mockResolvedValueOnce(fakeUsers)
      .mockResolvedValueOnce([{ name: 2 }]);
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toBeDefined();
  });

  test("should use default page 0 in geoNear branch when page not provided", async () => {
    fakeQuery.options = { userLoggedId: "507f1f77bcf86cd799439011" };
    repository.aggregate
      .mockResolvedValueOnce(fakeUsers)
      .mockResolvedValueOnce([{ name: 3 }]);
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toEqual({ users: fakeUsers, total: 3 });
  });

  test("should return empty users when first aggregate returns null in geoNear", async () => {
    repository.aggregate
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce([{ name: 3 }]);
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toEqual({ users: [], total: 3 });
  });
});
