import { describe, it, expect, jest, mock } from "bun:test";
mock.module("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
mock.module("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
mock.module("@/slices/owner/controllers", () => ({
  makeLoadOwnerController: jest.fn(),
  makeLoadOwnerByPageController: jest.fn(),
}));
mock.module("@/slices/service/controllers", () => ({
  makeLoadServiceByPageController: jest.fn(),
}));
mock.module("@/slices/user/controllers", () => ({
  makeLoadUserByPageController: jest.fn(),
}));

import { Elysia } from "elysia";
import { publica } from "./publicRouter";

describe("publicRouter", () => {
  it("should be a valid Elysia instance", () => {
    expect(publica).toBeDefined();
    expect(publica).toBeInstanceOf(Elysia);
  });
});
