import { fakeChargeEntity } from "@/slices/payment/charge/entities/ChargeEntity.spec";
import { DeleteChargeRepository } from "@/slices/payment/charge/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteCharge } from "./DeleteCharge";
import { Query } from "@/application/types";

describe("deleteCharge", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteChargeRepository: MockProxy<DeleteChargeRepository>;
  let fakePaymentProvider: any;

  beforeAll(async () => {
    MockDate.set(new Date());
    deleteChargeRepository = mock();
    fakePaymentProvider = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteChargeRepository.deleteCharge.mockResolvedValue(fakeChargeEntity);
  });
  beforeEach(() => {
    testInstance = deleteCharge(deleteChargeRepository, fakePaymentProvider);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteCharge of DeleteChargeRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteChargeRepository.deleteCharge).toHaveBeenCalledWith(fakeQuery);
    expect(deleteChargeRepository.deleteCharge).toHaveBeenCalledTimes(1);
  });
  it("should return a new charge deleted when deleteChargeRepository delete it", async () => {
    const charge = await testInstance(fakeQuery);
    expect(charge).toEqual(fakeChargeEntity);
  });
  it("should return null a new charge deleted when deleteChargeRepository delete it", async () => {
    deleteChargeRepository.deleteCharge.mockResolvedValue(null);
    const charge = await testInstance(fakeChargeEntity);
    expect(charge).toBeNull();
  });
  it("should rethrow if deleteCharge of DeleteChargeRepository throws", async () => {
    deleteChargeRepository.deleteCharge.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
