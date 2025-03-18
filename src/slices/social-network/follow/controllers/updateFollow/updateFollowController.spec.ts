import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateFollowController } from "./updateFollowController";
import { fakeFollowEntity } from "@/slices/social-network/follow/entities/FollowEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateFollowController", () => {
  let testInstance: UpdateFollowController;
  let updateFollow: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateFollow = jest.fn();
    updateFollow.mockResolvedValue({
      ...fakeFollowEntity,
      createdById: fakeUserEntity?._id,
    });
    validationQuery = mock();
    validationQuery.validate.mockResolvedValue([] as never);
    validationBody = mock();
    validationBody.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new UpdateFollowController(
      validationQuery,
      validationBody,
      updateFollow
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeFollowEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeFollowEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeFollowEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeFollowEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateFollow with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeFollowEntity,
      query: fakeFollowEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeFollowEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateFollow).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeFollowEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeFollowEntity
    );
    expect(updateFollow).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateFollow throw", async () => {
    updateFollow.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeFollowEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("user1Slug")]);
    const httpResponse = await testInstance.execute({ body: fakeFollowEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("user1Slug")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("user1Slug")]);
    const httpResponse = await testInstance.execute({ query: fakeFollowEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("user1Slug")]));
  });
});
