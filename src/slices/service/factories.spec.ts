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

import { makeAddServiceController } from "./controllers/addService/addServiceControllerFactory";
import { makeDeleteServiceController } from "./controllers/deleteService/deleteServiceControllerFactory";
import { makeLoadServiceController } from "./controllers/loadService/loadServiceControllerFactory";
import { makeLoadServiceByPageController } from "./controllers/loadServiceByPage/loadServiceByPageControllerFactory";
import { makeUpdateServiceController } from "./controllers/updateService/updateServiceControllerFactory";
import { makeAddServiceFactory } from "./useCases/addService/AddServiceFactory";
import { makeDeleteServiceFactory } from "./useCases/deleteService/DeleteServiceFactory";
import { makeLoadServiceFactory } from "./useCases/loadService/LoadServiceFactory";
import { makeLoadServiceByPageFactory } from "./useCases/loadServiceByPage/LoadServiceByPageFactory";
import { makeUpdateServiceFactory } from "./useCases/updateService/UpdateServiceFactory";

describe("makeAddServiceController", () => {
  it("should return a valid instance", () => {
    const result = makeAddServiceController();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteServiceController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteServiceController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadServiceController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadServiceController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadServiceByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadServiceByPageController();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateServiceController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateServiceController();
    expect(result).toBeDefined();
  });
});
describe("makeAddServiceFactory", () => {
  it("should return a valid instance", () => {
    const result = makeAddServiceFactory();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteServiceFactory", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteServiceFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadServiceFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadServiceFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadServiceByPageFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadServiceByPageFactory();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateServiceFactory", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateServiceFactory();
    expect(result).toBeDefined();
  });
});
