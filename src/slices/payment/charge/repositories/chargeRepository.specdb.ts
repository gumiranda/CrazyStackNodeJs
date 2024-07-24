import {
  fakeChargeEntity,
  fakeChargePaginated,
} from "@/slices/payment/charge/entities/ChargeEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { ChargeRepository } from "./chargeRepository";

describe("Charge Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: ChargeRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeChargeEntity);
    repository.getOne.mockResolvedValue(fakeChargeEntity);
    repository.update.mockResolvedValue(fakeChargeEntity);
    repository.getPaginate.mockResolvedValue(fakeChargePaginated?.charges);
    repository.getCount.mockResolvedValue(fakeChargePaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new ChargeRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addCharge with correct values", async () => {
    await testInstance.addCharge(fakeChargeEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeChargeEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new charge created when addCharge insert it", async () => {
    const result = await testInstance.addCharge(fakeChargeEntity);
    expect(result).toEqual(fakeChargeEntity);
  });
  test("should return null when addCharge returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addCharge(fakeChargeEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addCharge throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addCharge(fakeChargeEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateCharge throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateCharge(fakeQuery, fakeChargeEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateCharge with correct values", async () => {
    await testInstance.updateCharge(fakeQuery, fakeChargeEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeChargeEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a charge updated when updateCharge update it", async () => {
    const result = await testInstance.updateCharge(fakeQuery, fakeChargeEntity);
    expect(result).toEqual(fakeChargeEntity);
  });
  test("should return a charge updated when updateCharge update it when i pass null", async () => {
    const result = await testInstance.updateCharge(null as any, fakeChargeEntity);
    expect(result).toEqual(fakeChargeEntity);
  });
  test("should return null when updateCharge returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateCharge(fakeQuery, fakeChargeEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateCharge throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateCharge(fakeQuery, fakeChargeEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteCharge with correct values", async () => {
    await testInstance.deleteCharge(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new charge created when deleteCharge insert it", async () => {
    const result = await testInstance.deleteCharge(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteCharge returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteCharge(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteCharge throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteCharge(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadCharge with correct values", async () => {
    await testInstance.loadCharge(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a charge when loadCharge loaded it", async () => {
    const result = await testInstance.loadCharge(fakeQuery);
    expect(result).toEqual(fakeChargeEntity);
  });
  test("should return null when loadCharge returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadCharge(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadCharge returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadCharge(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadCharge throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadCharge(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadChargeByPage with correct values", async () => {
    await testInstance.loadChargeByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadChargeByPage with correct values", async () => {
    await testInstance.loadChargeByPage(fakeQuery);
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
  test("should return a chargeByPage when loadChargeByPage loaded it", async () => {
    const result = await testInstance.loadChargeByPage(fakeQuery);
    expect(result).toEqual(fakeChargePaginated);
  });
  test("should return null when loadChargeByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadChargeByPage(fakeQuery);
    expect(result).toEqual({ charges: null, total: 0 });
  });
  test("should return null when loadChargeByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadChargeByPage(null as any);
    expect(result).toEqual({ charges: null, total: 0 });
  });
  test("should rethrow if load of loadChargeByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadChargeByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
