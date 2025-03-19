import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddCategoryPlaceController } from "./addCategoryPlaceController";
import { fakeCategoryPlaceEntity } from "@/slices/categoryPlace/entities/CategoryPlaceEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddCategoryPlaceController", () => {
  let testInstance: AddCategoryPlaceController;
  let addCategoryPlace: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addCategoryPlace = jest.fn();
    addCategoryPlace.mockResolvedValue({
      ...fakeCategoryPlaceEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddCategoryPlaceController(validation, addCategoryPlace);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeCategoryPlaceEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeCategoryPlaceEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addCategoryPlace with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeCategoryPlaceEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeCategoryPlaceEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addCategoryPlace).toHaveBeenCalledWith({
      ...fakeCategoryPlaceEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addCategoryPlace).toHaveBeenCalledTimes(1);
  });
  test("should throws if addCategoryPlace throw", async () => {
    addCategoryPlace.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeCategoryPlaceEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeCategoryPlaceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
