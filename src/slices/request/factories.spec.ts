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

import { makeAddRequestController } from "./controllers/addRequest/addRequestControllerFactory";
import { makeDeleteRequestController } from "./controllers/deleteRequest/deleteRequestControllerFactory";
import { makeLoadRequestController } from "./controllers/loadRequest/loadRequestControllerFactory";
import { makeLoadRequestByPageController } from "./controllers/loadRequestByPage/loadRequestByPageControllerFactory";
import { makeUpdateRequestController } from "./controllers/updateRequest/updateRequestControllerFactory";
import { makeAddRequestFactory } from "./useCases/addRequest/AddRequestFactory";
import { makeDeleteRequestFactory } from "./useCases/deleteRequest/DeleteRequestFactory";
import { makeLoadRequestFactory } from "./useCases/loadRequest/LoadRequestFactory";
import { makeLoadRequestByPageFactory } from "./useCases/loadRequestByPage/LoadRequestByPageFactory";
import { makeUpdateRequestFactory } from "./useCases/updateRequest/UpdateRequestFactory";
import { makeUpdateRequestByIdFactory } from "./useCases/updateRequestById/UpdateRequestByIdFactory";

describe("makeAddRequestController", () => {
  it("should return a valid instance", () => {
    const result = makeAddRequestController();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteRequestController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteRequestController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadRequestController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadRequestController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadRequestByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadRequestByPageController();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateRequestController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateRequestController();
    expect(result).toBeDefined();
  });
});
describe("makeAddRequestFactory", () => {
  it("should return a valid instance", () => {
    const result = makeAddRequestFactory();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteRequestFactory", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteRequestFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadRequestFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadRequestFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadRequestByPageFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadRequestByPageFactory();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateRequestFactory", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateRequestFactory();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateRequestByIdFactory", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateRequestByIdFactory();
    expect(result).toBeDefined();
  });
});
