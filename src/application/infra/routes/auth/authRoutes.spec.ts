import { describe, it, expect, jest, mock } from "bun:test";
mock.module("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
mock.module("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
mock.module("@/slices/user/controllers", () => ({
  makeSignupController: jest.fn(),
  makeLoginController: jest.fn(),
  makeVerifyEmailController: jest.fn(),
  makeResendVerificationEmailController: jest.fn(),
}));

import { Elysia } from "elysia";
import { adaptRoute } from "@/application/adapters";
import {
  signupAdapter,
  loginAdapter,
  verifyEmailAdapter,
  resendVerificationAdapter,
} from "./authAdapter";
import { auth } from "./authRouter";

describe("authAdapter", () => {
  it("should return a function for signupAdapter", () => {
    const result = signupAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for loginAdapter", () => {
    const result = loginAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for verifyEmailAdapter", () => {
    const result = verifyEmailAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  it("should return a function for resendVerificationAdapter", () => {
    const result = resendVerificationAdapter();
    expect(adaptRoute).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

describe("authRouter", () => {
  it("should be a valid Elysia instance", () => {
    expect(auth).toBeDefined();
    expect(auth).toBeInstanceOf(Elysia);
  });
});
