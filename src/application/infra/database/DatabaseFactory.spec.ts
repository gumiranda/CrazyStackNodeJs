import { describe, it, expect, mock, jest } from "bun:test";

const mockMongoRepository = jest.fn().mockImplementation(() => ({
  type: "mongo",
}));
const mockPostgresRepository = jest.fn().mockImplementation(() => ({
  type: "postgres",
}));

mock.module("./mongodb", () => ({
  MongoRepository: mockMongoRepository,
}));
mock.module("./postgres", () => ({
  PostgresRepository: mockPostgresRepository,
}));

import { makeDatabaseInstance } from "./DatabaseFactory";

describe("makeDatabaseInstance", () => {
  it("should return MongoRepository when database is mongodb", () => {
    const repo = makeDatabaseInstance("mongodb", "users");
    expect(mockMongoRepository).toHaveBeenCalledWith("users");
    expect(repo).toBeDefined();
  });

  it("should return PostgresRepository when database is postgres", () => {
    const repo = makeDatabaseInstance("postgres", "users");
    expect(mockPostgresRepository).toHaveBeenCalledWith("users");
    expect(repo).toBeDefined();
  });
});
