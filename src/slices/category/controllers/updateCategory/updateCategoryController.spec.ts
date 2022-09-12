import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateCategoryController } from "./updateCategoryController";
import { fakeCategoryEntity } from "@/slices/category/entities/CategoryEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateCategoryController", () => {
  let testInstance: UpdateCategoryController;
  let updateCategory: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateCategory = jest.fn();
    updateCategory.mockResolvedValue({
      ...fakeCategoryEntity,
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
    testInstance = new UpdateCategoryController(
      validationQuery,
      validationBody,
      updateCategory
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeCategoryEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeCategoryEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeCategoryEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeCategoryEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateCategory with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeCategoryEntity,
      query: fakeCategoryEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeCategoryEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateCategory).toHaveBeenCalledWith(
      {
        ...fakeCategoryEntity,
        createdById: fakeUserEntity?._id,
      },
      fakeCategoryEntity
    );
    expect(updateCategory).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateCategory throw", async () => {
    updateCategory.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeCategoryEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeCategoryEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeCategoryEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
