import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddCategoryController } from "./addCategoryController";
import { fakeCategoryEntity } from "@/slices/category/entities/CategoryEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddCategoryController", () => {
  let testInstance: AddCategoryController;
  let addCategory: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addCategory = jest.fn();
    addCategory.mockResolvedValue({
      ...fakeCategoryEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddCategoryController(validation, addCategory);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeCategoryEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeCategoryEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addCategory with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeCategoryEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeCategoryEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addCategory).toHaveBeenCalledWith({
      ...fakeCategoryEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addCategory).toHaveBeenCalledTimes(1);
  });
  test("should throws if addCategory throw", async () => {
    addCategory.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeCategoryEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeCategoryEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
