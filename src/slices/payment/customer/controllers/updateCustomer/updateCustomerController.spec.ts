import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateCustomerController } from "./updateCustomerController";
import { fakeCustomerEntity } from "@/slices/payment/customer/entities/CustomerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateCustomerController", () => {
  let testInstance: UpdateCustomerController;
  let updateCustomer: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateCustomer = jest.fn();
    updateCustomer.mockResolvedValue({
      ...fakeCustomerEntity,
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
    testInstance = new UpdateCustomerController(
      validationQuery,
      validationBody,
      updateCustomer
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeCustomerEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeCustomerEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeCustomerEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeCustomerEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateCustomer with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeCustomerEntity,
      query: fakeCustomerEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeCustomerEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateCustomer).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeCustomerEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeCustomerEntity
    );
    expect(updateCustomer).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateCustomer throw", async () => {
    updateCustomer.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeCustomerEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeCustomerEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeCustomerEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
