import { UpdateChargeRepository } from "@/slices/payment/charge/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeChargeEntity } from "@/slices/payment/charge/entities/ChargeEntity.spec";
import { UpdateCharge, updateCharge } from "./UpdateCharge";

describe("UpdateCharge", () => {
  let fakeQuery: Query;
  let testInstance: UpdateCharge;
  let updateChargeRepository: MockProxy<UpdateChargeRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateChargeRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateChargeRepository.updateCharge.mockResolvedValue(fakeChargeEntity);
  });
  beforeEach(() => {
    testInstance = updateCharge(updateChargeRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateCharge of UpdateChargeRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeChargeEntity);
    expect(updateChargeRepository.updateCharge).toHaveBeenCalledWith(
      fakeQuery,
      fakeChargeEntity
    );
    expect(updateChargeRepository.updateCharge).toHaveBeenCalledTimes(1);
  });
  it("should return a charge updateed when updateChargeRepository insert it", async () => {
    const charge = await testInstance(fakeQuery, fakeChargeEntity);
    expect(charge).toEqual(fakeChargeEntity);
  });
  it("should return null a new charge updateed when updateChargeRepository return it", async () => {
    updateChargeRepository.updateCharge.mockResolvedValue(null);
    const charge = await testInstance(fakeQuery, fakeChargeEntity);
    expect(charge).toBeNull();
  });
  it("should rethrow if updateCharge of UpdateChargeRepository throws", async () => {
    updateChargeRepository.updateCharge.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeChargeEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
