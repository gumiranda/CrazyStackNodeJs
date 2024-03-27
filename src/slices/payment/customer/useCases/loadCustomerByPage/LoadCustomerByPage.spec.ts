import { LoadCustomerByPageRepository } from "@/slices/payment/customer/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCustomerPaginated } from "@/slices/payment/customer/entities/CustomerEntity.spec";
import { LoadCustomerByPage, loadCustomerByPage } from "./LoadCustomerByPage";

describe("LoadCustomerByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadCustomerByPage;
  let loadCustomerByPageRepository: MockProxy<LoadCustomerByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadCustomerByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadCustomerByPageRepository.loadCustomerByPage.mockResolvedValue(
      fakeCustomerPaginated
    );
  });
  beforeEach(() => {
    testInstance = loadCustomerByPage(loadCustomerByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadCustomerByPage of LoadCustomerByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadCustomerByPageRepository.loadCustomerByPage).toHaveBeenCalledWith(
      fakeQuery
    );
    expect(loadCustomerByPageRepository.loadCustomerByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a customer loaded when loadCustomerByPageRepository insert it", async () => {
    const customer = await testInstance(fakeQuery);
    expect(customer).toEqual(fakeCustomerPaginated);
  });
  it("should return null a new customer loaded when loadCustomerByPageRepository return it", async () => {
    loadCustomerByPageRepository.loadCustomerByPage.mockResolvedValue(null);
    const customer = await testInstance(fakeQuery);
    expect(customer).toBeNull();
  });
  it("should rethrow if loadCustomerByPage of LoadCustomerByPageRepository throws", async () => {
    loadCustomerByPageRepository.loadCustomerByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
