import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddRatingController } from "./addRatingController";
import { fakeRatingEntity } from "@/slices/rating/entities/RatingEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddRatingController", () => {
  let testInstance: AddRatingController;
  let addRating: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addRating = jest.fn();
    addRating.mockResolvedValue({
      ...fakeRatingEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddRatingController(validation, addRating);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeRatingEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeRatingEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addRating with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRatingEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRatingEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addRating).toHaveBeenCalledWith({
      ...fakeRatingEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addRating).toHaveBeenCalledTimes(1);
  });
  test("should throws if addRating throw", async () => {
    addRating.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRatingEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRatingEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
