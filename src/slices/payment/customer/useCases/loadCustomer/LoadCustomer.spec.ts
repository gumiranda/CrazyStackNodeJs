import { LoadCustomerRepository } from "@/slices/payment/customer/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCustomerEntity } from "@/slices/payment/customer/entities/CustomerEntity.spec";
import { LoadCustomer, loadCustomer } from "./LoadCustomer";

describe("LoadCustomer", () => {
  let fakeQuery: Query;
  let paymentProvider: any;
  let updateProvider: any;
  let testInstance: LoadCustomer;
  let loadCustomerRepository: MockProxy<LoadCustomerRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadCustomerRepository = mock();
    paymentProvider = mock();
    updateProvider = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadCustomerRepository.loadCustomer.mockResolvedValue(fakeCustomerEntity);
  });
  beforeEach(() => {
    testInstance = loadCustomer(loadCustomerRepository, paymentProvider, updateProvider);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadCustomer of LoadCustomerRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadCustomerRepository.loadCustomer).toHaveBeenCalledWith(fakeQuery);
    expect(loadCustomerRepository.loadCustomer).toHaveBeenCalledTimes(1);
  });
  it("should return a customer loaded when loadCustomerRepository insert it", async () => {
    const customer = await testInstance(fakeQuery);
    expect(customer).toEqual(fakeCustomerEntity);
  });
  it("should return null a new customer loaded when loadCustomerRepository return it", async () => {
    loadCustomerRepository.loadCustomer.mockResolvedValue(null);
    const customer = await testInstance(fakeQuery);
    expect(customer).toBeNull();
  });
  it("should rethrow if loadCustomer of LoadCustomerRepository throws", async () => {
    loadCustomerRepository.loadCustomer.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
