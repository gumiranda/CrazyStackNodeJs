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
mock.module("@/slices/owner/controllers", () => ({
  makeAddOwnerController: jest.fn(),
  makeLoadOwnerController: jest.fn(),
  makeDeleteOwnerController: jest.fn(),
  makeUpdateOwnerController: jest.fn(),
  makeLoadOwnerByPageController: jest.fn(),
}));

import { Elysia } from "elysia";
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
  it("should be a valid Elysia instance", () => {
    expect(owner).toBeDefined();
    expect(owner).toBeInstanceOf(Elysia);
  });
});
