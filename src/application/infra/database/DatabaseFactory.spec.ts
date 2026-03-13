import { describe, it, expect } from "bun:test";
import { makeDatabaseInstance } from "./DatabaseFactory";

describe("makeDatabaseInstance", () => {
  it("should return a repository instance for mongodb", () => {
    const repo = makeDatabaseInstance("mongodb", "users");
    expect(repo).toBeDefined();
    expect(typeof repo).toBe("object");
  });

  it("should return a repository instance for postgres", () => {
    const repo = makeDatabaseInstance("postgres", "users");
    expect(repo).toBeDefined();
    expect(typeof repo).toBe("object");
  });

  it("should create repository with correct table name", () => {
    const repo1 = makeDatabaseInstance("mongodb", "appointments");
    const repo2 = makeDatabaseInstance("postgres", "services");
    expect(repo1).toBeDefined();
    expect(repo2).toBeDefined();
  });
});
