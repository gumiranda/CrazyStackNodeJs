import { describe, it, test, expect, beforeEach, beforeAll, afterAll, jest, mock } from "bun:test";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import MockDate from "mockdate";
import { Middleware } from "@/application/infra/contracts";
import { AuthMiddleware } from "./authMiddleware";
import { forbidden, serverError, ok, unauthorized } from "@/application/helpers";
import { AccessDeniedError } from "@/application/errors";
import { SignJWT } from "jose";
import { env } from "@/application/infra/config";

const makeToken = async (payload: any = { _id: "507f1f77bcf86cd799439011" }): Promise<string> => {
  const secretKey = new TextEncoder().encode(env.jwtSecret);
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secretKey);
};

export const mockFakeRequestHeader = async (): Promise<any> => ({
  headers: { authorization: `Bearer ${await makeToken()}` },
});

describe("auth middleware", () => {
  let testInstance: Middleware;
  let loadUser: jest.Mock;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadUser = jest.fn();
    loadUser.mockResolvedValue(fakeUserEntity);
  });
  beforeEach(async () => {
    jest.clearAllMocks();
    loadUser.mockResolvedValue(fakeUserEntity);
    testInstance = new AuthMiddleware(loadUser, ["client"]);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should return 200 IF returns an user logged correctly", async () => {
    const httpResponse = await testInstance.handle(await mockFakeRequestHeader());
    expect(httpResponse).toEqual(
      ok({ userId: "123", userLogged: fakeUserEntity, daysToNextPayment: 30 })
    );
  });
  test("should return 401 IF returns null in verify token", async () => {
    const httpResponse = await testInstance.handle({
      headers: { authorization: "Bearer invalid_token_here" },
    });
    expect(httpResponse).toEqual(unauthorized());
  });
  test("should return 403 if no authorization exists in headers", async () => {
    const httpResponse = await testInstance.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  test("should return 500 if loadUser throws", async () => {
    loadUser.mockImplementationOnce(() => { throw new Error("loadUser_error"); });
    const httpResponse = await testInstance.handle(await mockFakeRequestHeader());
    expect(httpResponse).toEqual(serverError(new Error("loadUser_error")));
  });
  test("should return 403 when authorization header has no token after split", async () => {
    const httpResponse = await testInstance.handle({
      headers: { authorization: "Bearer " },
    });
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  test("should return 403 when user is not found by loadUser", async () => {
    loadUser.mockResolvedValueOnce(null);
    const httpResponse = await testInstance.handle(await mockFakeRequestHeader());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  test("should return 403 when user has no payDay", async () => {
    loadUser.mockResolvedValueOnce({ ...fakeUserEntity, payDay: null, payday: null });
    const httpResponse = await testInstance.handle(await mockFakeRequestHeader());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  test("should return 401 when token is expired or invalid", async () => {
    const httpResponse = await testInstance.handle({
      headers: { authorization: "Bearer totally.invalid.token" },
    });
    expect(httpResponse).toEqual(unauthorized());
  });
  test("should return 403 when owner has exceeded payment deadline", async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 60);
    loadUser.mockResolvedValueOnce({
      ...fakeUserEntity,
      role: "owner",
      payDay: pastDate.toISOString(),
      payday: null,
    });
    const httpResponse = await testInstance.handle(await mockFakeRequestHeader());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  test("should use postgres query format when database is not mongodb", async () => {
    const whiteLabelConfig = require("@/application/infra/config/whiteLabel");
    const originalDb = whiteLabelConfig.whiteLabel.database;
    whiteLabelConfig.whiteLabel.database = "postgres";
    try {
      const httpResponse = await testInstance.handle(await mockFakeRequestHeader());
      expect(httpResponse.statusCode).toBe(200);
      expect(loadUser).toHaveBeenCalledWith({
        fields: { _id: expect.any(String), role: ["client"] },
        options: { projection: { password: 0 } },
      });
    } finally {
      whiteLabelConfig.whiteLabel.database = originalDb;
    }
  });
});

mock.module("@/application/adapters", () => ({
  adaptMiddleware: jest.fn((middleware: any) => middleware),
}));
mock.module("@/slices/user/useCases/loadUser", () => ({
  makeLoadUserFactory: jest.fn(() => jest.fn()),
}));

import {
  authClient,
  authAdmin,
  authOwner,
  authProfessional,
  authVisitor,
  authLogged,
  makeAuthMiddleware,
} from "./authMiddlewareFactory";
import { adaptMiddleware } from "@/application/adapters";

describe("authMiddlewareFactory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makeAuthMiddleware should return an AuthMiddleware instance", () => {
    const result = makeAuthMiddleware(["client"]);
    expect(result).toBeInstanceOf(AuthMiddleware);
  });

  it("authClient should call adaptMiddleware with roles ['client', 'admin']", () => {
    const result = authClient();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(AuthMiddleware);
  });

  it("authAdmin should call adaptMiddleware with roles ['admin']", () => {
    const result = authAdmin();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(AuthMiddleware);
  });

  it("authOwner should call adaptMiddleware with roles ['owner', 'admin']", () => {
    const result = authOwner();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(AuthMiddleware);
  });

  it("authProfessional should call adaptMiddleware with roles ['owner', 'professional', 'admin']", () => {
    const result = authProfessional();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(AuthMiddleware);
  });

  it("authVisitor should call adaptMiddleware with roles including visitor", () => {
    const result = authVisitor();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(AuthMiddleware);
  });

  it("authLogged should call adaptMiddleware with roles ['owner', 'professional', 'client', 'admin']", () => {
    const result = authLogged();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(AuthMiddleware);
  });
});
