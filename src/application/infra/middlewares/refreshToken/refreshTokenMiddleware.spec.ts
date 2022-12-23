import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import MockDate from "mockdate";
import { Middleware } from "@/application/infra/contracts";
import { RefreshTokenMiddleware } from "./refreshTokenMiddleware";
import { forbidden, serverError, ok, unauthorized } from "@/application/helpers";
import { AccessDeniedError } from "@/application/errors";
jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return new Promise((resolve) => resolve("any_token"));
  },
  async verify(): Promise<string> {
    return new Promise((resolve) => resolve("any_value"));
  },
}));
export const mockFakeRequestHeader = (): any => ({
  headers: { refreshtoken: "any_token" },
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
    testInstance = new RefreshTokenMiddleware(loadUser, ["client"]);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should return 200 IF returns an user logged correctly", async () => {
    const httpResponse = await testInstance.handle(mockFakeRequestHeader());
    expect(httpResponse).toEqual(ok({ userId: "123", userLogged: fakeUserEntity }));
  });
  test("should return 401 IF returns null in verify token", async () => {
    jest.spyOn(testInstance, "verifyToken" as never).mockResolvedValueOnce(null as never);
    const httpResponse = await testInstance.handle(mockFakeRequestHeader());
    expect(httpResponse).toEqual(unauthorized());
  });
  test("should return 403 if no authorization exists in headers", async () => {
    const httpResponse = await testInstance.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  test("should return 500 if loadUser throws", async () => {
    loadUser.mockRejectedValueOnce(new Error("loadUser_error"));
    const httpResponse = await testInstance.handle(mockFakeRequestHeader());
    expect(httpResponse).toEqual(serverError(new Error("loadUser_error")));
  });
});
