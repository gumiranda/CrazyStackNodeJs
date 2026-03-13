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

import { makeAddOwnerController } from "./controllers/addOwner/addOwnerControllerFactory";
import { makeDeleteOwnerController } from "./controllers/deleteOwner/deleteOwnerControllerFactory";
import { makeLoadOwnerController } from "./controllers/loadOwner/loadOwnerControllerFactory";
import { makeLoadOwnerByPageController } from "./controllers/loadOwnerByPage/loadOwnerByPageControllerFactory";
import { makeUpdateOwnerController } from "./controllers/updateOwner/updateOwnerControllerFactory";
import { makeAddOwnerFactory } from "./useCases/addOwner/AddOwnerFactory";
import { makeDeleteOwnerFactory } from "./useCases/deleteOwner/DeleteOwnerFactory";
import { makeLoadOwnerFactory } from "./useCases/loadOwner/LoadOwnerFactory";
import { makeLoadOwnerByPageFactory } from "./useCases/loadOwnerByPage/LoadOwnerByPageFactory";
import { makeUpdateOwnerFactory } from "./useCases/updateOwner/UpdateOwnerFactory";

describe("makeAddOwnerController", () => {
  it("should return a valid instance", () => {
    const result = makeAddOwnerController();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteOwnerController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteOwnerController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadOwnerController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadOwnerController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadOwnerByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadOwnerByPageController();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateOwnerController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateOwnerController();
    expect(result).toBeDefined();
  });
});
describe("makeAddOwnerFactory", () => {
  it("should return a valid instance", () => {
    const result = makeAddOwnerFactory();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteOwnerFactory", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteOwnerFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadOwnerFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadOwnerFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadOwnerByPageFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadOwnerByPageFactory();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateOwnerFactory", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateOwnerFactory();
    expect(result).toBeDefined();
  });
});
