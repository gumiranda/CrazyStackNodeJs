import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddRatingResultController } from "./addRatingResultController";
import { fakeRatingResultEntity } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddRatingResultController", () => {
  let testInstance: AddRatingResultController;
  let addRatingResult: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addRatingResult = jest.fn();
    addRatingResult.mockResolvedValue({
      ...fakeRatingResultEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddRatingResultController(validation, addRatingResult);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeRatingResultEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeRatingResultEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addRatingResult with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRatingResultEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRatingResultEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addRatingResult).toHaveBeenCalledWith({
      ...fakeRatingResultEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addRatingResult).toHaveBeenCalledTimes(1);
  });
  test("should throws if addRatingResult throw", async () => {
    addRatingResult.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRatingResultEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRatingResultEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
