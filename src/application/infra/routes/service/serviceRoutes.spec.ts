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
mock.module("@/slices/service/controllers", () => ({
  makeAddServiceController: jest.fn(),
  makeLoadServiceController: jest.fn(),
  makeDeleteServiceController: jest.fn(),
  makeUpdateServiceController: jest.fn(),
  makeLoadServiceByPageController: jest.fn(),
}));

import { Elysia } from "elysia";
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
  it("should be a valid Elysia instance", () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(Elysia);
  });
});
