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
mock.module("@/slices/user/controllers", () => ({
  makeAddUserController: jest.fn(),
  makeLoadUserController: jest.fn(),
  makeDeleteUserController: jest.fn(),
  makeUpdateUserController: jest.fn(),
  makeLoadUserByPageController: jest.fn(),
  makeLoadUserByPageGeoNearController: jest.fn(),
}));

import { Elysia } from "elysia";
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
  it("should be a valid Elysia instance", () => {
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(Elysia);
  });
});
