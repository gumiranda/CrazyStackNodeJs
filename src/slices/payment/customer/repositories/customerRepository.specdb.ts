import {
  fakeCustomerEntity,
  fakeCustomerPaginated,
} from "@/slices/payment/customer/entities/CustomerEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { CustomerRepository } from "./customerRepository";

describe("Customer Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: CustomerRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeCustomerEntity);
    repository.getOne.mockResolvedValue(fakeCustomerEntity);
    repository.update.mockResolvedValue(fakeCustomerEntity);
    repository.getPaginate.mockResolvedValue(fakeCustomerPaginated?.customers);
    repository.getCount.mockResolvedValue(fakeCustomerPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new CustomerRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addCustomer with correct values", async () => {
    await testInstance.addCustomer(fakeCustomerEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeCustomerEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new customer created when addCustomer insert it", async () => {
    const result = await testInstance.addCustomer(fakeCustomerEntity);
    expect(result).toEqual(fakeCustomerEntity);
  });
  test("should return null when addCustomer returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addCustomer(fakeCustomerEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addCustomer throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addCustomer(fakeCustomerEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateCustomer throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateCustomer(fakeQuery, fakeCustomerEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateCustomer with correct values", async () => {
    await testInstance.updateCustomer(fakeQuery, fakeCustomerEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeCustomerEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a customer updated when updateCustomer update it", async () => {
    const result = await testInstance.updateCustomer(fakeQuery, fakeCustomerEntity);
    expect(result).toEqual(fakeCustomerEntity);
  });
  test("should return a customer updated when updateCustomer update it when i pass null", async () => {
    const result = await testInstance.updateCustomer(null as any, fakeCustomerEntity);
    expect(result).toEqual(fakeCustomerEntity);
  });
  test("should return null when updateCustomer returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateCustomer(fakeQuery, fakeCustomerEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateCustomer throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateCustomer(fakeQuery, fakeCustomerEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteCustomer with correct values", async () => {
    await testInstance.deleteCustomer(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new customer created when deleteCustomer insert it", async () => {
    const result = await testInstance.deleteCustomer(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteCustomer returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteCustomer(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteCustomer throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteCustomer(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadCustomer with correct values", async () => {
    await testInstance.loadCustomer(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a customer when loadCustomer loaded it", async () => {
    const result = await testInstance.loadCustomer(fakeQuery);
    expect(result).toEqual(fakeCustomerEntity);
  });
  test("should return null when loadCustomer returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadCustomer(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadCustomer returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadCustomer(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadCustomer throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadCustomer(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadCustomerByPage with correct values", async () => {
    await testInstance.loadCustomerByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadCustomerByPage with correct values", async () => {
    await testInstance.loadCustomerByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(
      0,
      fakeQuery?.fields,
      {
        createdAt: -1,
      },
      10,
      {}
    );
    expect(repository.getPaginate).toHaveBeenCalledTimes(1);
  });
  test("should return a customerByPage when loadCustomerByPage loaded it", async () => {
    const result = await testInstance.loadCustomerByPage(fakeQuery);
    expect(result).toEqual(fakeCustomerPaginated);
  });
  test("should return null when loadCustomerByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadCustomerByPage(fakeQuery);
    expect(result).toEqual({ customers: null, total: 0 });
  });
  test("should return null when loadCustomerByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadCustomerByPage(null as any);
    expect(result).toEqual({ customers: null, total: 0 });
  });
  test("should rethrow if load of loadCustomerByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadCustomerByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
