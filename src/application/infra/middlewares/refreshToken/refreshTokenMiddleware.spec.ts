import { describe, it, test, expect, beforeEach, beforeAll, afterAll, jest, mock } from "bun:test";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import MockDate from "mockdate";
import { Middleware } from "@/application/infra/contracts";
import { RefreshTokenMiddleware } from "./refreshTokenMiddleware";
import { forbidden, serverError, ok, unauthorized } from "@/application/helpers";
import { AccessDeniedError } from "@/application/errors";
import { SignJWT } from "jose";
import { env } from "@/application/infra/config";

const makeRefreshToken = async (payload: any = { _id: "507f1f77bcf86cd799439011" }): Promise<string> => {
  const secretKey = new TextEncoder().encode(env.jwtRefreshSecret);
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secretKey);
};

export const mockFakeRequestHeader = async (): Promise<any> => ({
  headers: { refreshtoken: await makeRefreshToken() },
});

describe("refresh token middleware", () => {
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
    testInstance = new RefreshTokenMiddleware(loadUser, ["client"]);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should return 200 IF returns an user logged correctly", async () => {
    const httpResponse = await testInstance.handle(await mockFakeRequestHeader());
    expect(httpResponse).toEqual(ok({ userId: "123", userLogged: fakeUserEntity }));
  });
  test("should return 401 IF token is invalid", async () => {
    const httpResponse = await testInstance.handle({
      headers: { refreshtoken: "invalid_token" },
    });
    expect(httpResponse).toEqual(unauthorized());
  });
  test("should return 403 if no refreshtoken exists in headers", async () => {
    const httpResponse = await testInstance.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  test("should return 500 if loadUser throws", async () => {
    loadUser.mockImplementationOnce(() => { throw new Error("loadUser_error"); });
    const httpResponse = await testInstance.handle(await mockFakeRequestHeader());
    expect(httpResponse).toEqual(serverError(new Error("loadUser_error")));
  });
  test("should return 403 when user is not found by loadUser", async () => {
    loadUser.mockResolvedValueOnce(null);
    const httpResponse = await testInstance.handle(await mockFakeRequestHeader());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  test("should use postgres query format when database is not mongodb", async () => {
    const whiteLabel = require("@/application/infra/config/whiteLabel").whiteLabel;
    const originalDb = whiteLabel.database;
    whiteLabel.database = "postgres";
    try {
      const httpResponse = await testInstance.handle(await mockFakeRequestHeader());
      expect(httpResponse).toEqual(ok({ userId: "123", userLogged: fakeUserEntity }));
      expect(loadUser).toHaveBeenCalledWith(
        expect.objectContaining({
          fields: expect.objectContaining({ role: ["client"] }),
          options: { projection: { password: 0 } },
        })
      );
    } finally {
      whiteLabel.database = originalDb;
    }
  });
});

mock.module("@/application/adapters", () => ({
  adaptMiddleware: jest.fn((middleware: any) => middleware),
}));
mock.module("@/slices/user/useCases", () => ({
  makeLoadUserFactory: jest.fn(() => jest.fn()),
}));

import {
  refreshtokenClient,
  refreshtokenAdmin,
  refreshtokenOwner,
  refreshtokenProfessional,
  refreshtokenVisitor,
  refreshtokenLogged,
  makeRefreshTokenMiddleware,
} from "./refreshTokenMiddlewareFactory";
import { adaptMiddleware } from "@/application/adapters";

describe("refreshTokenMiddlewareFactory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makeRefreshTokenMiddleware should return a RefreshTokenMiddleware instance", () => {
    const result = makeRefreshTokenMiddleware(["client"]);
    expect(result).toBeInstanceOf(RefreshTokenMiddleware);
  });

  it("refreshtokenClient should call adaptMiddleware with RefreshTokenMiddleware", () => {
    const result = refreshtokenClient();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(RefreshTokenMiddleware);
  });

  it("refreshtokenAdmin should call adaptMiddleware with RefreshTokenMiddleware", () => {
    const result = refreshtokenAdmin();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(RefreshTokenMiddleware);
  });

  it("refreshtokenOwner should call adaptMiddleware with RefreshTokenMiddleware", () => {
    const result = refreshtokenOwner();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(RefreshTokenMiddleware);
  });

  it("refreshtokenProfessional should call adaptMiddleware with RefreshTokenMiddleware", () => {
    const result = refreshtokenProfessional();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(RefreshTokenMiddleware);
  });

  it("refreshtokenVisitor should call adaptMiddleware with RefreshTokenMiddleware", () => {
    const result = refreshtokenVisitor();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(RefreshTokenMiddleware);
  });

  it("refreshtokenLogged should call adaptMiddleware with RefreshTokenMiddleware", () => {
    const result = refreshtokenLogged();
    expect(adaptMiddleware).toHaveBeenCalledTimes(1);
    const middleware = (adaptMiddleware as jest.Mock).mock.calls[0][0];
    expect(middleware).toBeInstanceOf(RefreshTokenMiddleware);
  });
});
