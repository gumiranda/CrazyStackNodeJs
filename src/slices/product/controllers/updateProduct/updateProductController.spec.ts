import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateProductController } from "./updateProductController";
import { fakeProductEntity } from "@/slices/product/entities/ProductEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateProductController", () => {
  let testInstance: UpdateProductController;
  let updateProduct: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateProduct = jest.fn();
    updateProduct.mockResolvedValue({
      ...fakeProductEntity,
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
    testInstance = new UpdateProductController(
      validationQuery,
      validationBody,
      updateProduct
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeProductEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeProductEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeProductEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeProductEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateProduct with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeProductEntity,
      query: fakeProductEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeProductEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateProduct).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeProductEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeProductEntity
    );
    expect(updateProduct).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateProduct throw", async () => {
    updateProduct.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeProductEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeProductEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeProductEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
