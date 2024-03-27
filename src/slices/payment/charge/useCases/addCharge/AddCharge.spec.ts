import { fakeChargeEntity } from "@/slices/payment/charge/entities/ChargeEntity.spec";
import { ChargeEntity } from "@/slices/payment/charge/entities";
import { AddChargeRepository } from "@/slices/payment/charge/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addCharge } from "./AddCharge";

describe("addCharge", () => {
  let testInstance: any;
  let addChargeRepository: MockProxy<AddChargeRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addChargeRepository = mock();
    addChargeRepository.addCharge.mockResolvedValue(fakeChargeEntity);
  });
  beforeEach(() => {
    testInstance = addCharge(addChargeRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addCharge of AddChargeRepository with correct values", async () => {
    await testInstance(fakeChargeEntity);
    expect(addChargeRepository.addCharge).toHaveBeenCalledWith(
      new ChargeEntity(fakeChargeEntity)
    );
    expect(addChargeRepository.addCharge).toHaveBeenCalledTimes(1);
  });
  it("should return a new charge created when addChargeRepository insert it", async () => {
    const charge = await testInstance(fakeChargeEntity);
    expect(charge).toEqual(fakeChargeEntity);
  });
  it("should return null a new charge created when addChargeRepository insert it", async () => {
    addChargeRepository.addCharge.mockResolvedValue(null);
    const charge = await testInstance(fakeChargeEntity);
    expect(charge).toBeNull();
  });
  it("should rethrow if addCharge of AddChargeRepository throws", async () => {
    addChargeRepository.addCharge.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeChargeEntity)).rejects.toThrowError("any_error");
  });
});
