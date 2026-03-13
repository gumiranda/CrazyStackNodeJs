import { describe, it, expect, jest, mock } from "bun:test";
mock.module("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));
mock.module("@/application/infra", () => {
  const mockRepo = {
    add: jest.fn(), getOne: jest.fn(), update: jest.fn(),
    getPaginate: jest.fn(), getCount: jest.fn(), deleteOne: jest.fn(),
    aggregate: jest.fn(), increment: jest.fn(),
  };
  return {
    makeDatabaseInstance: jest.fn().mockReturnValue(mockRepo),
    env: { jwtSecret: "secret", jwtRefreshSecret: "secret", uploadProvider: "cloudflare_r2" },
    BcryptAdapter: jest.fn().mockImplementation(() => ({ compare: jest.fn(), encrypt: jest.fn() })),
    JwtAdapter: jest.fn().mockImplementation(() => ({ generate: jest.fn(), decrypt: jest.fn() })),
    MongoRepository: jest.fn().mockImplementation(() => mockRepo),
    PostgresRepository: jest.fn().mockImplementation(() => mockRepo),
  };
});
mock.module("@/application/infra/config/whiteLabel", () => ({
  whiteLabel: { database: "mongodb", systemName: "Test", categories: [{ name: "Cat", description: "D", services: [{ name: "S", description: "D", price: 50, comission: 50, duration: 30 }] }] },
}));

import { makeAddCategoryController } from "./controllers/addCategory/addCategoryControllerFactory";
import { makeDeleteCategoryController } from "./controllers/deleteCategory/deleteCategoryControllerFactory";
import { makeLoadCategoryController } from "./controllers/loadCategory/loadCategoryControllerFactory";
import { makeLoadCategoryByPageController } from "./controllers/loadCategoryByPage/loadCategoryByPageControllerFactory";
import { makeUpdateCategoryController } from "./controllers/updateCategory/updateCategoryControllerFactory";
import { makeAddCategoryFactory } from "./useCases/addCategory/AddCategoryFactory";
import { makeDeleteCategoryFactory } from "./useCases/deleteCategory/DeleteCategoryFactory";
import { makeLoadCategoryFactory } from "./useCases/loadCategory/LoadCategoryFactory";
import { makeLoadCategoryByPageFactory } from "./useCases/loadCategoryByPage/LoadCategoryByPageFactory";
import { makeUpdateCategoryFactory } from "./useCases/updateCategory/UpdateCategoryFactory";

describe("makeAddCategoryController", () => {
  it("should return a valid instance", () => {
    const result = makeAddCategoryController();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteCategoryController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteCategoryController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadCategoryController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadCategoryController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadCategoryByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadCategoryByPageController();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateCategoryController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateCategoryController();
    expect(result).toBeDefined();
  });
});
describe("makeAddCategoryFactory", () => {
  it("should return a valid instance", () => {
    const result = makeAddCategoryFactory();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteCategoryFactory", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteCategoryFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadCategoryFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadCategoryFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadCategoryByPageFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadCategoryByPageFactory();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateCategoryFactory", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateCategoryFactory();
    expect(result).toBeDefined();
  });
});
