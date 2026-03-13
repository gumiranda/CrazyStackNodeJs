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
mock.module("@/slices/request/controllers", () => ({
  makeAddRequestController: jest.fn(),
  makeLoadRequestController: jest.fn(),
  makeDeleteRequestController: jest.fn(),
  makeUpdateRequestController: jest.fn(),
  makeLoadRequestByPageController: jest.fn(),
}));

import { Elysia } from "elysia";
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
  it("should be a valid Elysia instance", () => {
    expect(request).toBeDefined();
    expect(request).toBeInstanceOf(Elysia);
  });
});
