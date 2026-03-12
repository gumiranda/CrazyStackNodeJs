jest.mock("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/infra/middlewares", () => ({
  authLogged: jest.fn(() => jest.fn()),
}));
jest.mock("@/slices/category/controllers", () => ({
  makeAddCategoryController: jest.fn(),
  makeLoadCategoryController: jest.fn(),
  makeDeleteCategoryController: jest.fn(),
  makeUpdateCategoryController: jest.fn(),
  makeLoadCategoryByPageController: jest.fn(),
}));

import { adaptRoute } from "@/application/adapters";
import {
  addCategoryAdapter,
  loadCategoryAdapter,
  loadCategoryByPageAdapter,
  deleteCategoryAdapter,
  updateCategoryAdapter,
} from "./categoryAdapter";
import { category } from "./categoryRouter";

describe("categoryAdapter", () => {
  it("should return a function for addCategoryAdapter", () => {
    const result = addCategoryAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadCategoryAdapter", () => {
    const result = loadCategoryAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loadCategoryByPageAdapter", () => {
    const result = loadCategoryByPageAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for deleteCategoryAdapter", () => {
    const result = deleteCategoryAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for updateCategoryAdapter", () => {
    const result = updateCategoryAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

describe("categoryRouter", () => {
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
    await category(mockFastify as any, {} as any);
    expect(mockFastify.addHook).toHaveBeenCalledWith("preHandler", expect.any(Function));
  });

  it("should register POST /category/add route", async () => {
    await category(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/category/add",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /category/load route", async () => {
    await category(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/category/load",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /category/loadByPage route", async () => {
    await category(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/category/loadByPage",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register DELETE /category/delete route", async () => {
    await category(mockFastify as any, {} as any);
    expect(mockFastify.delete).toHaveBeenCalledWith(
      "/category/delete",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register PATCH /category/update route", async () => {
    await category(mockFastify as any, {} as any);
    expect(mockFastify.patch).toHaveBeenCalledWith(
      "/category/update",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register the correct number of routes", async () => {
    await category(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledTimes(1);
    expect(mockFastify.get).toHaveBeenCalledTimes(2);
    expect(mockFastify.delete).toHaveBeenCalledTimes(1);
    expect(mockFastify.patch).toHaveBeenCalledTimes(1);
  });
});
