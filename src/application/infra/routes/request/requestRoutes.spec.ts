jest.mock("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/infra/middlewares", () => ({
  authLogged: jest.fn(() => jest.fn()),
}));
jest.mock("@/slices/request/controllers", () => ({
  makeAddRequestController: jest.fn(),
  makeLoadRequestController: jest.fn(),
  makeDeleteRequestController: jest.fn(),
  makeUpdateRequestController: jest.fn(),
  makeLoadRequestByPageController: jest.fn(),
}));

import { adaptRoute } from "@/application/adapters";
import {
  addRequestAdapter,
  loadRequestAdapter,
  loadRequestByPageAdapter,
  deleteRequestAdapter,
  updateRequestAdapter,
} from "./requestAdapter";
import { request } from "./requestRouter";

describe("requestAdapter", () => {
  it("should return a function for addRequestAdapter", () => {
    const result = addRequestAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadRequestAdapter", () => {
    const result = loadRequestAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadRequestByPageAdapter", () => {
    const result = loadRequestByPageAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for deleteRequestAdapter", () => {
    const result = deleteRequestAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for updateRequestAdapter", () => {
    const result = updateRequestAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

describe("requestRouter", () => {
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
    await request(mockFastify as any, {} as any);
    expect(mockFastify.addHook).toHaveBeenCalledWith("preHandler", expect.any(Function));
  });

  it("should register POST /request/add route", async () => {
    await request(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/request/add",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /request/load route", async () => {
    await request(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/request/load",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /request/loadByPage route", async () => {
    await request(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/request/loadByPage",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register DELETE /request/delete route", async () => {
    await request(mockFastify as any, {} as any);
    expect(mockFastify.delete).toHaveBeenCalledWith(
      "/request/delete",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register PATCH /request/update route", async () => {
    await request(mockFastify as any, {} as any);
    expect(mockFastify.patch).toHaveBeenCalledWith(
      "/request/update",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register the correct number of routes", async () => {
    await request(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledTimes(1);
    expect(mockFastify.get).toHaveBeenCalledTimes(2);
    expect(mockFastify.delete).toHaveBeenCalledTimes(1);
    expect(mockFastify.patch).toHaveBeenCalledTimes(1);
  });
});
