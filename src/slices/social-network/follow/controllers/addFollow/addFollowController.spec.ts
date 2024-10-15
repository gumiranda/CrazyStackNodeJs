import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddFollowController } from "./addFollowController";
import { fakeFollowEntity } from "@/slices/social-network/follow/entities/FollowEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddFollowController", () => {
  let testInstance: AddFollowController;
  let addFollow: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addFollow = jest.fn();
    addFollow.mockResolvedValue({
      ...fakeFollowEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddFollowController(validation, addFollow);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeFollowEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeFollowEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addFollow with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeFollowEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeFollowEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addFollow).toHaveBeenCalledWith({
      ...fakeFollowEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addFollow).toHaveBeenCalledTimes(1);
  });
  test("should throws if addFollow throw", async () => {
    addFollow.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeFollowEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("user1Slug")]);
    const httpResponse = await testInstance.execute({ body: fakeFollowEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("user1Slug")]));
  });
});
