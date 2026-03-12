jest.mock("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/infra/middlewares", () => ({
  authLogged: jest.fn(() => jest.fn()),
}));
jest.mock("@/slices/user/controllers", () => ({
  makeAddUserController: jest.fn(),
  makeLoadUserController: jest.fn(),
  makeDeleteUserController: jest.fn(),
  makeUpdateUserController: jest.fn(),
  makeLoadUserByPageController: jest.fn(),
  makeLoadUserByPageGeoNearController: jest.fn(),
}));

import { adaptRoute } from "@/application/adapters";
import {
  addUserAdapter,
  loadUserAdapter,
  loadUserByPageAdapter,
  loadUserByGeoNearAdapter,
  deleteUserAdapter,
  updateUserAdapter,
} from "./userAdapter";
import { user } from "./userRouter";

describe("userAdapter", () => {
  it("should return a function for addUserAdapter", () => {
    const result = addUserAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadUserAdapter", () => {
    const result = loadUserAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadUserByPageAdapter", () => {
    const result = loadUserByPageAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadUserByGeoNearAdapter", () => {
    const result = loadUserByGeoNearAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for deleteUserAdapter", () => {
    const result = deleteUserAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for updateUserAdapter", () => {
    const result = updateUserAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

describe("userRouter", () => {
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
    await user(mockFastify as any);
    expect(mockFastify.addHook).toHaveBeenCalledWith("preHandler", expect.any(Function));
  });

  it("should register POST /user/add route", async () => {
    await user(mockFastify as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/user/add",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /user/load route", async () => {
    await user(mockFastify as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/user/load",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /user/loadByPage route", async () => {
    await user(mockFastify as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/user/loadByPage",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /user/loadByGeoNear route", async () => {
    await user(mockFastify as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/user/loadByGeoNear",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register DELETE /user/delete route", async () => {
    await user(mockFastify as any);
    expect(mockFastify.delete).toHaveBeenCalledWith(
      "/user/delete",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register PATCH /user/update route", async () => {
    await user(mockFastify as any);
    expect(mockFastify.patch).toHaveBeenCalledWith(
      "/user/update",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register the correct number of routes", async () => {
    await user(mockFastify as any);
    expect(mockFastify.post).toHaveBeenCalledTimes(1);
    expect(mockFastify.get).toHaveBeenCalledTimes(3);
    expect(mockFastify.delete).toHaveBeenCalledTimes(1);
    expect(mockFastify.patch).toHaveBeenCalledTimes(1);
  });
});
