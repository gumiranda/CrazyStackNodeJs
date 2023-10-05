import { fakeCarEntity, fakeCarPaginated } from "@/slices/car/entities/CarEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { CarRepository } from "./carRepository";

describe("Car Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: CarRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeCarEntity);
    repository.getOne.mockResolvedValue(fakeCarEntity);
    repository.update.mockResolvedValue(fakeCarEntity);
    repository.getPaginate.mockResolvedValue(fakeCarPaginated?.cars);
    repository.getCount.mockResolvedValue(fakeCarPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new CarRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addCar with correct values", async () => {
    await testInstance.addCar(fakeCarEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeCarEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new car created when addCar insert it", async () => {
    const result = await testInstance.addCar(fakeCarEntity);
    expect(result).toEqual(fakeCarEntity);
  });
  test("should return null when addCar returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addCar(fakeCarEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addCar throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addCar(fakeCarEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateCar throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateCar(fakeQuery, fakeCarEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateCar with correct values", async () => {
    await testInstance.updateCar(fakeQuery, fakeCarEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeCarEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a car updated when updateCar update it", async () => {
    const result = await testInstance.updateCar(fakeQuery, fakeCarEntity);
    expect(result).toEqual(fakeCarEntity);
  });
  test("should return a car updated when updateCar update it when i pass null", async () => {
    const result = await testInstance.updateCar(null as any, fakeCarEntity);
    expect(result).toEqual(fakeCarEntity);
  });
  test("should return null when updateCar returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateCar(fakeQuery, fakeCarEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateCar throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateCar(fakeQuery, fakeCarEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteCar with correct values", async () => {
    await testInstance.deleteCar(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new car created when deleteCar insert it", async () => {
    const result = await testInstance.deleteCar(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteCar returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteCar(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteCar throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteCar(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadCar with correct values", async () => {
    await testInstance.loadCar(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a car when loadCar loaded it", async () => {
    const result = await testInstance.loadCar(fakeQuery);
    expect(result).toEqual(fakeCarEntity);
  });
  test("should return null when loadCar returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadCar(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadCar returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadCar(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadCar throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadCar(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadCarByPage with correct values", async () => {
    await testInstance.loadCarByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadCarByPage with correct values", async () => {
    await testInstance.loadCarByPage(fakeQuery);
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
  test("should return a carByPage when loadCarByPage loaded it", async () => {
    const result = await testInstance.loadCarByPage(fakeQuery);
    expect(result).toEqual(fakeCarPaginated);
  });
  test("should return null when loadCarByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadCarByPage(fakeQuery);
    expect(result).toEqual({ cars: null, total: 0 });
  });
  test("should return null when loadCarByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadCarByPage(null as any);
    expect(result).toEqual({ cars: null, total: 0 });
  });
  test("should rethrow if load of loadCarByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadCarByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
