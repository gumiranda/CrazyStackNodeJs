jest.mock("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/infra/middlewares", () => ({
  authLogged: jest.fn(() => jest.fn()),
}));
jest.mock("@/slices/service/controllers", () => ({
  makeAddServiceController: jest.fn(),
  makeLoadServiceController: jest.fn(),
  makeDeleteServiceController: jest.fn(),
  makeUpdateServiceController: jest.fn(),
  makeLoadServiceByPageController: jest.fn(),
}));

import { adaptRoute } from "@/application/adapters";
import {
  addServiceAdapter,
  loadServiceAdapter,
  loadServiceByPageAdapter,
  deleteServiceAdapter,
  updateServiceAdapter,
} from "./serviceAdapter";
import { service } from "./serviceRouter";

describe("serviceAdapter", () => {
  it("should return a function for addServiceAdapter", () => {
    const result = addServiceAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadServiceAdapter", () => {
    const result = loadServiceAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadServiceByPageAdapter", () => {
    const result = loadServiceByPageAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for deleteServiceAdapter", () => {
    const result = deleteServiceAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for updateServiceAdapter", () => {
    const result = updateServiceAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

describe("serviceRouter", () => {
  const mockFastify = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    addHook: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register the preHandler hook with authLogged", async () => {
    await service(mockFastify as any, {} as any);
    expect(mockFastify.addHook).toHaveBeenCalledWith("preHandler", expect.any(Function));
  });

  it("should register POST /service/add route", async () => {
    await service(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/service/add",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /service/load route", async () => {
    await service(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/service/load",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /service/loadByPage route", async () => {
    await service(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/service/loadByPage",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register DELETE /service/delete route", async () => {
    await service(mockFastify as any, {} as any);
    expect(mockFastify.delete).toHaveBeenCalledWith(
      "/service/delete",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register PATCH /service/update route", async () => {
    await service(mockFastify as any, {} as any);
    expect(mockFastify.patch).toHaveBeenCalledWith(
      "/service/update",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register the correct number of routes", async () => {
    await service(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledTimes(1);
    expect(mockFastify.get).toHaveBeenCalledTimes(2);
    expect(mockFastify.delete).toHaveBeenCalledTimes(1);
    expect(mockFastify.patch).toHaveBeenCalledTimes(1);
  });
});
