import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateCategoryPlaceController } from "./updateCategoryPlaceController";
import { fakeCategoryPlaceEntity } from "@/slices/categoryPlace/entities/CategoryPlaceEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateCategoryPlaceController", () => {
  let testInstance: UpdateCategoryPlaceController;
  let updateCategoryPlace: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateCategoryPlace = jest.fn();
    updateCategoryPlace.mockResolvedValue({
      ...fakeCategoryPlaceEntity,
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
    testInstance = new UpdateCategoryPlaceController(
      validationQuery,
      validationBody,
      updateCategoryPlace
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeCategoryPlaceEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeCategoryPlaceEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeCategoryPlaceEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeCategoryPlaceEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateCategoryPlace with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeCategoryPlaceEntity,
      query: fakeCategoryPlaceEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeCategoryPlaceEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateCategoryPlace).toHaveBeenCalledWith(
       {
        fields: {
         ...fakeCategoryPlaceEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeCategoryPlaceEntity
    );
    expect(updateCategoryPlace).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateCategoryPlace throw", async () => {
    updateCategoryPlace.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeCategoryPlaceEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeCategoryPlaceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeCategoryPlaceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
