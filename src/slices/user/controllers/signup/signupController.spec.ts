/* eslint-disable @typescript-eslint/no-explicit-any */
import MockDate from "mockdate";
import {
  addDays,
  Authentication,
  badRequest,
  forbidden,
  ok,
  unauthorized,
  Validation,
} from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { SignupController } from "./signupController";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { fakeAccountEntity } from "@/slices/account/entities/AccountEntity.spec";
import { Controller } from "@/application/infra/contracts";
import {
  EmailInUseError,
  InvalidParamError,
  MissingParamError,
} from "@/application/errors";
jest.mock("deep-email-validator", () => {
  return {
    __esModule: true,
    default: jest
      .fn()
      .mockResolvedValue({
        validators: {
          regex: { valid: true },
          typo: { valid: true },
          disposable: { valid: true },
          smtp: { valid: true },
          mx: { valid: true },
        },
      })
      .mockResolvedValueOnce({
        validators: {
          regex: { valid: false },
          typo: { valid: true },
          disposable: { valid: true },
          smtp: { valid: true },
          mx: { valid: true },
        },
      })
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        validators: { regex: null },
      }),
  };
});
describe("SignUpController", () => {
  let testInstance: SignupController;
  let addUser: jest.Mock;
  let loadUser: jest.Mock;
  let addAccount: jest.Mock;
  let authentication: MockProxy<Authentication>;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addUser = jest.fn();
    addUser.mockResolvedValue(fakeUserEntity);
    loadUser = jest.fn();
    loadUser.mockResolvedValue(null);
    addAccount = jest.fn();
    addAccount.mockResolvedValue(fakeAccountEntity);
    authentication = mock();
    validation = mock();
    authentication.auth.mockResolvedValue({
      accessToken: "fakeAccessToken",
      refreshToken: "fakeRefreshToken",
    });
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new SignupController(
      validation,
      addUser,
      loadUser,
      authentication,
      addAccount
    );
  });
  test("should return badrequest when email is invalid", async () => {
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(badRequest([new InvalidParamError("email")]));
  });
  test("should return badrequest when email is invalid and validators is null", async () => {
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(badRequest([new InvalidParamError("email")]));
  });
  test("should return badrequest when email is invalid and validators regex and others is null", async () => {
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(badRequest([new InvalidParamError("email")]));
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeUserEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeUserEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addUser with correct params", async () => {
    await testInstance.execute({ body: fakeUserEntity });
    expect(addUser).toHaveBeenCalledWith(fakeUserEntity);
    expect(addUser).toHaveBeenCalledTimes(1);
  });
  test("should call loadUser with correct params", async () => {
    await testInstance.execute({ body: fakeUserEntity });
    expect(loadUser).toHaveBeenCalledWith({
      fields: { email: fakeUserEntity?.email },
      options: { projection: { password: 0 } },
    });
    expect(loadUser).toHaveBeenCalledTimes(1);
  });
  test("should call auth of authentication with correct params", async () => {
    await testInstance.execute({ body: fakeUserEntity });
    expect(authentication.auth).toHaveBeenCalledWith(
      fakeUserEntity?.email,
      fakeUserEntity?.password
    );
    expect(authentication.auth).toHaveBeenCalledTimes(1);
  });
  test("should call addAccount with correct params", async () => {
    await testInstance.execute({ body: fakeUserEntity });
    expect(addAccount).toHaveBeenCalledWith({
      createdById: fakeUserEntity?._id,
      name: fakeUserEntity?.name,
      refreshToken: "fakeRefreshToken",
      active: true,
      expiresAt: addDays(new Date(), 1),
    });
    expect(addAccount).toHaveBeenCalledTimes(1);
  });
  test("should return success if authentication signup succeeds", async () => {
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(
      ok({
        user: fakeUserEntity,
        accessToken: "fakeAccessToken",
        refreshToken: "fakeRefreshToken",
      })
    );
  });
  test("should return error if authentication signup gots an error", async () => {
    addUser.mockRejectedValueOnce(new Error("fakeError"));
    const httpResponse = testInstance.execute({ body: fakeUserEntity });
    await expect(httpResponse).rejects.toThrow("fakeError");
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("email")]);
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("email")]));
  });
  test("should return forbidden request if user exists", async () => {
    loadUser.mockResolvedValueOnce(fakeUserEntity);
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });
  test("should return unauthorized if token is null", async () => {
    authentication.auth.mockResolvedValueOnce(null);
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(unauthorized());
  });
});
