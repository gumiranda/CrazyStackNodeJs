import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateOrderController } from "./updateOrderController";
import { fakeOrderEntity } from "@/slices/order/entities/OrderEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateOrderController", () => {
  let testInstance: UpdateOrderController;
  let updateOrder: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateOrder = jest.fn();
    updateOrder.mockResolvedValue({
      ...fakeOrderEntity,
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
    testInstance = new UpdateOrderController(validationQuery, validationBody, updateOrder);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeOrderEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeOrderEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeOrderEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeOrderEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateOrder with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeOrderEntity,
      query: fakeOrderEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeOrderEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateOrder).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeOrderEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeOrderEntity
    );
    expect(updateOrder).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateOrder throw", async () => {
    updateOrder.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeOrderEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeOrderEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeOrderEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
