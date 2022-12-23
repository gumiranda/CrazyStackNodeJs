import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateRatingController } from "./updateRatingController";
import { fakeRatingEntity } from "@/slices/rating/entities/RatingEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateRatingController", () => {
  let testInstance: UpdateRatingController;
  let updateRating: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateRating = jest.fn();
    updateRating.mockResolvedValue({
      ...fakeRatingEntity,
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
    testInstance = new UpdateRatingController(
      validationQuery,
      validationBody,
      updateRating
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeRatingEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeRatingEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeRatingEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeRatingEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateRating with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRatingEntity,
      query: fakeRatingEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRatingEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateRating).toHaveBeenCalledWith(
      {
        ...fakeRatingEntity,
        createdById: fakeUserEntity?._id,
      },
      fakeRatingEntity
    );
    expect(updateRating).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateRating throw", async () => {
    updateRating.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRatingEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRatingEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeRatingEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
