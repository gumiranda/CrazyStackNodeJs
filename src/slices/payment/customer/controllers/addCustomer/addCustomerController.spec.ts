import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddCustomerController } from "./addCustomerController";
import { fakeCustomerEntity } from "@/slices/payment/customer/entities/CustomerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddCustomerController", () => {
  let testInstance: AddCustomerController;
  let addCustomer: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addCustomer = jest.fn();
    addCustomer.mockResolvedValue({
      ...fakeCustomerEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddCustomerController(validation, addCustomer);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeCustomerEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeCustomerEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addCustomer with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeCustomerEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeCustomerEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addCustomer).toHaveBeenCalledWith({
      ...fakeCustomerEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addCustomer).toHaveBeenCalledTimes(1);
  });
  test("should throws if addCustomer throw", async () => {
    addCustomer.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeCustomerEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeCustomerEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
