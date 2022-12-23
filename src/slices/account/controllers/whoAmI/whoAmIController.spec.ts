import MockDate from "mockdate";
import {
  addDays,
  Authentication,
  ok,
  unauthorized,
  Validation,
} from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { WhoAmIController } from "./whoAmIController";
import { fakeAccountEntity } from "@/slices/account/entities/AccountEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("WhoAmIController", () => {
  let testInstanceParams: any;
  let testInstance: WhoAmIController;
  let loadAccount: jest.Mock;
  let loadUser: jest.Mock;
  let authentication: MockProxy<Authentication>;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    testInstanceParams = {
      query: fakeAccountEntity,
      userId: "fakeId",
      headers: { refreshtoken: "fakeRefreshToken" },
    };
    MockDate.set(new Date());
    loadAccount = jest.fn();
    loadAccount.mockResolvedValue(fakeAccountEntity);
    loadUser = jest.fn();
    loadUser.mockResolvedValue(fakeUserEntity);
    authentication = mock();
    validation = mock();
    authentication.authRefreshToken.mockResolvedValue({
      accessToken: "fakeAccessToken",
      refreshToken: "fakeRefreshToken",
    });
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new WhoAmIController(validation, loadAccount, loadUser, authentication);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute(testInstanceParams);
    expect(validation.validate).toHaveBeenCalledWith(undefined);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadAccount with correct params", async () => {
    await testInstance.execute(testInstanceParams);
    expect(loadAccount).toHaveBeenCalledWith({
      fields: {
        createdById: testInstanceParams.userId,
        refreshToken: testInstanceParams.headers.refreshtoken,
        isFutureexpiresAt: new Date(),
      },
      options: {},
    });
    expect(loadAccount).toHaveBeenCalledTimes(1);
  });
  test("should call authRefreshToken of authentication with correct params", async () => {
    await testInstance.execute(testInstanceParams);
    expect(authentication.authRefreshToken).toHaveBeenCalledWith(
      testInstanceParams.userId
    );
    expect(authentication.authRefreshToken).toHaveBeenCalledTimes(1);
  });
  test("should call loadUser with correct params", async () => {
    await testInstance.execute(testInstanceParams);
    expect(loadUser).toHaveBeenCalledWith({
      fields: { _id: testInstanceParams?.userId as string },
      options: {},
    });
    expect(loadUser).toHaveBeenCalledTimes(1);
  });
  test("should return success if authentication loadUser succeeds", async () => {
    const httpResponse = await testInstance.execute(testInstanceParams);
    expect(httpResponse).toEqual(
      ok({
        user: fakeUserEntity,
      })
    );
  });
  test("should return unauthorized request if account does not exists", async () => {
    loadAccount.mockResolvedValueOnce(null);
    const httpResponse = await testInstance.execute(testInstanceParams);
    expect(httpResponse).toEqual(unauthorized());
  });
  test("should return unauthorized if token is null", async () => {
    authentication.authRefreshToken.mockResolvedValueOnce(null);
    const httpResponse = await testInstance.execute(testInstanceParams);
    expect(httpResponse).toEqual(unauthorized());
  });
});
