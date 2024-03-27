import { fakeCustomerEntity } from "@/slices/payment/customer/entities/CustomerEntity.spec";
import { CustomerEntity } from "@/slices/payment/customer/entities";
import { AddCustomerRepository } from "@/slices/payment/customer/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addCustomer } from "./AddCustomer";

describe("addCustomer", () => {
  let testInstance: any;
  let paymentProvider: any;
  let addCustomerRepository: MockProxy<AddCustomerRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addCustomerRepository = mock();
    paymentProvider = mock();

    addCustomerRepository.addCustomer.mockResolvedValue(fakeCustomerEntity);
  });
  beforeEach(() => {
    testInstance = addCustomer(addCustomerRepository, paymentProvider);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addCustomer of AddCustomerRepository with correct values", async () => {
    await testInstance(fakeCustomerEntity);
    expect(addCustomerRepository.addCustomer).toHaveBeenCalledWith(
      new CustomerEntity(fakeCustomerEntity)
    );
    expect(addCustomerRepository.addCustomer).toHaveBeenCalledTimes(1);
  });
  it("should return a new customer created when addCustomerRepository insert it", async () => {
    const customer = await testInstance(fakeCustomerEntity);
    expect(customer).toEqual(fakeCustomerEntity);
  });
  it("should return null a new customer created when addCustomerRepository insert it", async () => {
    addCustomerRepository.addCustomer.mockResolvedValue(null);
    const customer = await testInstance(fakeCustomerEntity);
    expect(customer).toBeNull();
  });
  it("should rethrow if addCustomer of AddCustomerRepository throws", async () => {
    addCustomerRepository.addCustomer.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeCustomerEntity)).rejects.toThrowError("any_error");
  });
});
