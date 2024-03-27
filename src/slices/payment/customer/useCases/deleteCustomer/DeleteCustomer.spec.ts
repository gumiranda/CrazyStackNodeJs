import { fakeCustomerEntity } from "@/slices/payment/customer/entities/CustomerEntity.spec";
import { CustomerEntity } from "@/slices/payment/customer/entities";
import { DeleteCustomerRepository } from "@/slices/payment/customer/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteCustomer } from "./DeleteCustomer";
import { Query } from "@/application/types";

describe("deleteCustomer", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteCustomerRepository: MockProxy<DeleteCustomerRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteCustomerRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteCustomerRepository.deleteCustomer.mockResolvedValue(fakeCustomerEntity);
  });
  beforeEach(() => {
    testInstance = deleteCustomer(deleteCustomerRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteCustomer of DeleteCustomerRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteCustomerRepository.deleteCustomer).toHaveBeenCalledWith(fakeQuery);
    expect(deleteCustomerRepository.deleteCustomer).toHaveBeenCalledTimes(1);
  });
  it("should return a new customer deleted when deleteCustomerRepository delete it", async () => {
    const customer = await testInstance(fakeQuery);
    expect(customer).toEqual(fakeCustomerEntity);
  });
  it("should return null a new customer deleted when deleteCustomerRepository delete it", async () => {
    deleteCustomerRepository.deleteCustomer.mockResolvedValue(null);
    const customer = await testInstance(fakeCustomerEntity);
    expect(customer).toBeNull();
  });
  it("should rethrow if deleteCustomer of DeleteCustomerRepository throws", async () => {
    deleteCustomerRepository.deleteCustomer.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
