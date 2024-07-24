import { LoadChargeRepository } from "@/slices/payment/charge/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeChargeEntity } from "@/slices/payment/charge/entities/ChargeEntity.spec";
import { LoadCharge, loadCharge } from "./LoadCharge";

describe("LoadCharge", () => {
  let fakeQuery: Query;
  let testInstance: LoadCharge;
  let loadChargeRepository: MockProxy<LoadChargeRepository>;
  let fakePaymentProvider: any;
  let updateCharge: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadChargeRepository = mock();
    fakePaymentProvider = mock();
    updateCharge = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadChargeRepository.loadCharge.mockResolvedValue(fakeChargeEntity);
  });
  beforeEach(() => {
    testInstance = loadCharge(loadChargeRepository, fakePaymentProvider, updateCharge);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadCharge of LoadChargeRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadChargeRepository.loadCharge).toHaveBeenCalledWith(fakeQuery);
    expect(loadChargeRepository.loadCharge).toHaveBeenCalledTimes(1);
  });
  it("should return a charge loaded when loadChargeRepository insert it", async () => {
    const charge = await testInstance(fakeQuery);
    expect(charge).toEqual(fakeChargeEntity);
  });
  it("should return null a new charge loaded when loadChargeRepository return it", async () => {
    loadChargeRepository.loadCharge.mockResolvedValue(null);
    const charge = await testInstance(fakeQuery);
    expect(charge).toBeNull();
  });
  it("should rethrow if loadCharge of LoadChargeRepository throws", async () => {
    loadChargeRepository.loadCharge.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
