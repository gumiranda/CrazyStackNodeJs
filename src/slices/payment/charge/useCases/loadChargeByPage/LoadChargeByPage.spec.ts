import { LoadChargeByPageRepository } from "@/slices/payment/charge/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeChargePaginated } from "@/slices/payment/charge/entities/ChargeEntity.spec";
import { LoadChargeByPage, loadChargeByPage } from "./LoadChargeByPage";

describe("LoadChargeByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadChargeByPage;
  let loadChargeByPageRepository: MockProxy<LoadChargeByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadChargeByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadChargeByPageRepository.loadChargeByPage.mockResolvedValue(fakeChargePaginated);
  });
  beforeEach(() => {
    testInstance = loadChargeByPage(loadChargeByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadChargeByPage of LoadChargeByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadChargeByPageRepository.loadChargeByPage).toHaveBeenCalledWith(fakeQuery);
    expect(loadChargeByPageRepository.loadChargeByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a charge loaded when loadChargeByPageRepository insert it", async () => {
    const charge = await testInstance(fakeQuery);
    expect(charge).toEqual(fakeChargePaginated);
  });
  it("should return null a new charge loaded when loadChargeByPageRepository return it", async () => {
    loadChargeByPageRepository.loadChargeByPage.mockResolvedValue(null);
    const charge = await testInstance(fakeQuery);
    expect(charge).toBeNull();
  });
  it("should rethrow if loadChargeByPage of LoadChargeByPageRepository throws", async () => {
    loadChargeByPageRepository.loadChargeByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
