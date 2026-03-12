jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));
jest.mock("@/application/infra", () => {
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
jest.mock("@/application/infra/config/whiteLabel", () => ({
  whiteLabel: { database: "mongodb", systemName: "Test", categories: [{ name: "Cat", description: "D", services: [{ name: "S", description: "D", price: 50, comission: 50, duration: 30 }] }] },
}));

import { makeAddPhotoController } from "./controllers/addPhoto/addPhotoControllerFactory";
import { makeDeletePhotoController } from "./controllers/deletePhoto/deletePhotoControllerFactory";
import { makeLoadPhotoController } from "./controllers/loadPhoto/loadPhotoControllerFactory";
import { makeLoadPhotoByPageController } from "./controllers/loadPhotoByPage/loadPhotoByPageControllerFactory";
import { makeUpdatePhotoController } from "./controllers/updatePhoto/updatePhotoControllerFactory";
import { makeAddPhotoFactory } from "./useCases/addPhoto/AddPhotoFactory";
import { makeDeletePhotoFactory } from "./useCases/deletePhoto/DeletePhotoFactory";
import { makeLoadPhotoFactory } from "./useCases/loadPhoto/LoadPhotoFactory";
import { makeLoadPhotoByPageFactory } from "./useCases/loadPhotoByPage/LoadPhotoByPageFactory";
import { makeUpdatePhotoFactory } from "./useCases/updatePhoto/UpdatePhotoFactory";

describe("makeAddPhotoController", () => {
  it("should return a valid instance", () => {
    const result = makeAddPhotoController();
    expect(result).toBeDefined();
  });
});
describe("makeDeletePhotoController", () => {
  it("should return a valid instance", () => {
    const result = makeDeletePhotoController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadPhotoController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadPhotoController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadPhotoByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadPhotoByPageController();
    expect(result).toBeDefined();
  });
});
describe("makeUpdatePhotoController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdatePhotoController();
    expect(result).toBeDefined();
  });
});
describe("makeAddPhotoFactory", () => {
  it("should return a valid instance", () => {
    const result = makeAddPhotoFactory();
    expect(result).toBeDefined();
  });
});
describe("makeDeletePhotoFactory", () => {
  it("should return a valid instance", () => {
    const result = makeDeletePhotoFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadPhotoFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadPhotoFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadPhotoByPageFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadPhotoByPageFactory();
    expect(result).toBeDefined();
  });
});
describe("makeUpdatePhotoFactory", () => {
  it("should return a valid instance", () => {
    const result = makeUpdatePhotoFactory();
    expect(result).toBeDefined();
  });
});
