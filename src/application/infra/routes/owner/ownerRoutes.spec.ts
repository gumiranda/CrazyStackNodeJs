jest.mock("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/infra/middlewares", () => ({
  authLogged: jest.fn(() => jest.fn()),
}));
jest.mock("@/slices/owner/controllers", () => ({
  makeAddOwnerController: jest.fn(),
  makeLoadOwnerController: jest.fn(),
  makeDeleteOwnerController: jest.fn(),
  makeUpdateOwnerController: jest.fn(),
  makeLoadOwnerByPageController: jest.fn(),
}));

import { adaptRoute } from "@/application/adapters";
import {
  addOwnerAdapter,
  loadOwnerAdapter,
  loadOwnerByPageAdapter,
  deleteOwnerAdapter,
  updateOwnerAdapter,
} from "./ownerAdapter";
import { owner } from "./ownerRouter";

describe("ownerAdapter", () => {
  it("should return a function for addOwnerAdapter", () => {
    const result = addOwnerAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadOwnerAdapter", () => {
    const result = loadOwnerAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadOwnerByPageAdapter", () => {
    const result = loadOwnerByPageAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for deleteOwnerAdapter", () => {
    const result = deleteOwnerAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for updateOwnerAdapter", () => {
    const result = updateOwnerAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

describe("ownerRouter", () => {
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
    await owner(mockFastify as any, {} as any);
    expect(mockFastify.addHook).toHaveBeenCalledWith("preHandler", expect.any(Function));
  });

  it("should register POST /owner/add route", async () => {
    await owner(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/owner/add",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /owner/load route", async () => {
    await owner(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/owner/load",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /owner/loadByPage route", async () => {
    await owner(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/owner/loadByPage",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register DELETE /owner/delete route", async () => {
    await owner(mockFastify as any, {} as any);
    expect(mockFastify.delete).toHaveBeenCalledWith(
      "/owner/delete",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register PATCH /owner/update route", async () => {
    await owner(mockFastify as any, {} as any);
    expect(mockFastify.patch).toHaveBeenCalledWith(
      "/owner/update",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register the correct number of routes", async () => {
    await owner(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledTimes(1);
    expect(mockFastify.get).toHaveBeenCalledTimes(2);
    expect(mockFastify.delete).toHaveBeenCalledTimes(1);
    expect(mockFastify.patch).toHaveBeenCalledTimes(1);
  });
});
