import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddUserController } from "./addUserController";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";

describe("AddUserController", () => {
  let testInstance: AddUserController;
  let addUser: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addUser = jest.fn();
    addUser.mockResolvedValue({
      ...fakeUserEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddUserController(validation, addUser);
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
    const result = await testInstance.execute({
      body: fakeUserEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeUserEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addUser).toHaveBeenCalledWith({
      ...fakeUserEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addUser).toHaveBeenCalledTimes(1);
  });
  test("should throws if addUser throw", async () => {
    addUser.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeUserEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeUserEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
