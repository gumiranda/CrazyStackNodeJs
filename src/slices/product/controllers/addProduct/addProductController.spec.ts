import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddProductController } from "./addProductController";
import { fakeProductEntity } from "@/slices/product/entities/ProductEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddProductController", () => {
  let testInstance: AddProductController;
  let addProduct: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addProduct = jest.fn();
    addProduct.mockResolvedValue({
      ...fakeProductEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddProductController(validation, addProduct);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeProductEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeProductEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addProduct with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeProductEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeProductEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addProduct).toHaveBeenCalledWith({
      ...fakeProductEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addProduct).toHaveBeenCalledTimes(1);
  });
  test("should throws if addProduct throw", async () => {
    addProduct.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeProductEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeProductEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
