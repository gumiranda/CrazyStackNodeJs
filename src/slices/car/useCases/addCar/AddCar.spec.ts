import { fakeCarEntity } from "@/slices/car/entities/CarEntity.spec";
import { CarEntity } from "@/slices/car/entities";
import { AddCarRepository } from "@/slices/car/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addCar } from "./AddCar";

describe("addCar", () => {
  let testInstance: any;
  let addCarRepository: MockProxy<AddCarRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addCarRepository = mock();
    addCarRepository.addCar.mockResolvedValue(fakeCarEntity);
  });
  beforeEach(() => {
    testInstance = addCar(addCarRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addCar of AddCarRepository with correct values", async () => {
    await testInstance(fakeCarEntity);
    expect(addCarRepository.addCar).toHaveBeenCalledWith(new CarEntity(fakeCarEntity));
    expect(addCarRepository.addCar).toHaveBeenCalledTimes(1);
  });
  it("should return a new car created when addCarRepository insert it", async () => {
    const car = await testInstance(fakeCarEntity);
    expect(car).toEqual(fakeCarEntity);
  });
  it("should return null a new car created when addCarRepository insert it", async () => {
    addCarRepository.addCar.mockResolvedValue(null);
    const car = await testInstance(fakeCarEntity);
    expect(car).toBeNull();
  });
  it("should rethrow if addCar of AddCarRepository throws", async () => {
    addCarRepository.addCar.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeCarEntity)).rejects.toThrowError("any_error");
  });
});
