import { UpdateCarRepository } from "@/slices/car/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCarEntity } from "@/slices/car/entities/CarEntity.spec";
import { UpdateCar, updateCar } from "./UpdateCar";

describe("UpdateCar", () => {
  let fakeQuery: Query;
  let testInstance: UpdateCar;
  let updateCarRepository: MockProxy<UpdateCarRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateCarRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateCarRepository.updateCar.mockResolvedValue(fakeCarEntity);
  });
  beforeEach(() => {
    testInstance = updateCar(updateCarRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateCar of UpdateCarRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeCarEntity);
    expect(updateCarRepository.updateCar).toHaveBeenCalledWith(fakeQuery, fakeCarEntity);
    expect(updateCarRepository.updateCar).toHaveBeenCalledTimes(1);
  });
  it("should return a car updateed when updateCarRepository insert it", async () => {
    const car = await testInstance(fakeQuery, fakeCarEntity);
    expect(car).toEqual(fakeCarEntity);
  });
  it("should return null a new car updateed when updateCarRepository return it", async () => {
    updateCarRepository.updateCar.mockResolvedValue(null);
    const car = await testInstance(fakeQuery, fakeCarEntity);
    expect(car).toBeNull();
  });
  it("should rethrow if updateCar of UpdateCarRepository throws", async () => {
    updateCarRepository.updateCar.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeCarEntity)).rejects.toThrowError("any_error");
  });
});
