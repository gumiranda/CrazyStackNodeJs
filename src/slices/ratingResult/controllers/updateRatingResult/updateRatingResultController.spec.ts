import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateRatingResultController } from "./updateRatingResultController";
import { fakeRatingResultEntity } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateRatingResultController", () => {
  let testInstance: UpdateRatingResultController;
  let updateRatingResult: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateRatingResult = jest.fn();
    updateRatingResult.mockResolvedValue({
      ...fakeRatingResultEntity,
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
    testInstance = new UpdateRatingResultController(
      validationQuery,
      validationBody,
      updateRatingResult
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeRatingResultEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeRatingResultEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeRatingResultEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeRatingResultEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateRatingResult with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRatingResultEntity,
      query: fakeRatingResultEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRatingResultEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateRatingResult).toHaveBeenCalledWith(
       {
        fields: {
         ...fakeRatingResultEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeRatingResultEntity
    );
    expect(updateRatingResult).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateRatingResult throw", async () => {
    updateRatingResult.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRatingResultEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRatingResultEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeRatingResultEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
