jest.mock("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
jest.mock("@/slices/user/controllers", () => ({
  makeSignupController: jest.fn(),
  makeLoginController: jest.fn(),
  makeVerifyEmailController: jest.fn(),
  makeResendVerificationEmailController: jest.fn(),
}));

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

  it("should register POST /auth/signup route", async () => {
    await auth(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/auth/signup",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register POST /auth/verify-email route", async () => {
    await auth(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/auth/verify-email",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register POST /auth/resend-email route", async () => {
    await auth(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/auth/resend-email",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register POST /auth/login route", async () => {
    await auth(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledWith(
      "/auth/login",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should not register a preHandler hook (auth routes are public)", async () => {
    await auth(mockFastify as any, {} as any);
    expect(mockFastify.addHook).not.toHaveBeenCalled();
  });

  it("should register the correct number of routes", async () => {
    await auth(mockFastify as any, {} as any);
    expect(mockFastify.post).toHaveBeenCalledTimes(4);
    expect(mockFastify.get).not.toHaveBeenCalled();
    expect(mockFastify.delete).not.toHaveBeenCalled();
    expect(mockFastify.patch).not.toHaveBeenCalled();
  });
});
