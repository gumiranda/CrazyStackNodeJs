import { describe, test, expect, beforeEach, beforeAll, afterAll, jest, mock as bunMock } from "bun:test";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { mock, MockProxy } from "jest-mock-extended";
import { UserAggregatePgRepository, mapPassword } from "./UserAggregatePgRepository";
import MockDate from "mockdate";

bunMock.module("@/application/helpers", () => ({
  SQLQueryBuilder: jest.fn().mockImplementation(() => {
    const builder: any = {};
    builder.projectWithDistance = jest.fn().mockReturnValue(builder);
    builder.match = jest.fn().mockReturnValue(builder);
    builder.addValue = jest.fn().mockReturnValue(builder);
    builder.sortByDistance = jest.fn().mockReturnValue(builder);
    builder.skip = jest.fn().mockReturnValue(builder);
    builder.limit = jest.fn().mockReturnValue(builder);
    builder.build = jest.fn().mockReturnValue({ text: "SELECT *", values: [] });
    return builder;
  }),
}));

describe("UserAggregatePgRepository", () => {
  let testInstance: UserAggregatePgRepository;
  let repository: MockProxy<Repository>;
  let fakeQuery: Query;
  const fakeUsers = [
    { _id: "1", name: "user1", password: "secret1" },
    { _id: "2", name: "user2", password: "secret2" },
  ];

  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    repository = mock<Repository>();
    repository.aggregate.mockResolvedValue(fakeUsers);
    testInstance = new UserAggregatePgRepository(repository);
    fakeQuery = {
      fields: { lng: -43.1, lat: -22.9 },
      options: { userLoggedId: "user-id-123", page: 1, limitPerPage: 10 },
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

  test("should return users without password on success", async () => {
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toBeTruthy();
    expect(result?.users).toHaveLength(2);
    result?.users.forEach((user: any) => {
      expect(user.password).toBeUndefined();
    });
    expect(result?.total).toBe(10);
  });

  test("should call repository.aggregate with built query", async () => {
    await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(repository.aggregate).toHaveBeenCalledTimes(1);
    expect(repository.aggregate).toHaveBeenCalledWith({ text: "SELECT *", values: [] });
  });

  test("should return empty users array when aggregate returns null", async () => {
    repository.aggregate.mockResolvedValueOnce(null);
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toBeTruthy();
    expect(result?.users).toEqual([]);
  });

  test("should use default page 0 when page is not provided", async () => {
    fakeQuery.options = { userLoggedId: "user-id-123" };
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result).toBeTruthy();
  });

  test("should use default limitPerPage 10 when not provided", async () => {
    fakeQuery.options = { userLoggedId: "user-id-123" };
    const result = await testInstance.loadUserByPageGeoNear(fakeQuery);
    expect(result?.total).toBe(10);
  });

  test("should rethrow if repository.aggregate throws", async () => {
    repository.aggregate.mockRejectedValueOnce(new Error("aggregate error"));
    await expect(testInstance.loadUserByPageGeoNear(fakeQuery)).rejects.toThrow(
      "aggregate error"
    );
  });
});

describe("mapPassword", () => {
  test("should remove password from all users in array", () => {
    const users = [
      { _id: "1", name: "user1", password: "secret1" },
      { _id: "2", name: "user2", password: "secret2" },
    ];
    const result = mapPassword(users);
    expect(result).toHaveLength(2);
    result.forEach((user: any) => {
      expect(user.password).toBeUndefined();
    });
  });

  test("should handle empty array", () => {
    const result = mapPassword([]);
    expect(result).toEqual([]);
  });

  test("should handle users without password field", () => {
    const users = [{ _id: "1", name: "user1" }];
    const result = mapPassword(users);
    expect(result).toEqual([{ _id: "1", name: "user1" }]);
  });
});
