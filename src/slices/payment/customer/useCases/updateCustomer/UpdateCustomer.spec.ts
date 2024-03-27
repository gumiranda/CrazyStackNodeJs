import { UpdateCustomerRepository } from "@/slices/payment/customer/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCustomerEntity } from "@/slices/payment/customer/entities/CustomerEntity.spec";
import { UpdateCustomer, updateCustomer } from "./UpdateCustomer";

describe("UpdateCustomer", () => {
  let fakeQuery: Query;
  let testInstance: UpdateCustomer;
  let updateCustomerRepository: MockProxy<UpdateCustomerRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateCustomerRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateCustomerRepository.updateCustomer.mockResolvedValue(fakeCustomerEntity);
  });
  beforeEach(() => {
    testInstance = updateCustomer(updateCustomerRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateCustomer of UpdateCustomerRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeCustomerEntity);
    expect(updateCustomerRepository.updateCustomer).toHaveBeenCalledWith(
      fakeQuery,
      fakeCustomerEntity
    );
    expect(updateCustomerRepository.updateCustomer).toHaveBeenCalledTimes(1);
  });
  it("should return a customer updateed when updateCustomerRepository insert it", async () => {
    const customer = await testInstance(fakeQuery, fakeCustomerEntity);
    expect(customer).toEqual(fakeCustomerEntity);
  });
  it("should return null a new customer updateed when updateCustomerRepository return it", async () => {
    updateCustomerRepository.updateCustomer.mockResolvedValue(null);
    const customer = await testInstance(fakeQuery, fakeCustomerEntity);
    expect(customer).toBeNull();
  });
  it("should rethrow if updateCustomer of UpdateCustomerRepository throws", async () => {
    updateCustomerRepository.updateCustomer.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeCustomerEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
