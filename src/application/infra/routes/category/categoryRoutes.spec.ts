import { describe, it, expect, jest, mock } from "bun:test";
mock.module("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
mock.module("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
mock.module("@/application/infra/middlewares", () => ({
  authLogged: jest.fn(() => jest.fn()),
}));
mock.module("@/slices/category/controllers", () => ({
  makeAddCategoryController: jest.fn(),
  makeLoadCategoryController: jest.fn(),
  makeDeleteCategoryController: jest.fn(),
  makeUpdateCategoryController: jest.fn(),
  makeLoadCategoryByPageController: jest.fn(),
}));

import { Elysia } from "elysia";
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
  it("should be a valid Elysia instance", () => {
    expect(category).toBeDefined();
    expect(category).toBeInstanceOf(Elysia);
  });
});
