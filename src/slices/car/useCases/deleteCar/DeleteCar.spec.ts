import { fakeCarEntity } from "@/slices/car/entities/CarEntity.spec";
import { CarEntity } from "@/slices/car/entities";
import { DeleteCarRepository } from "@/slices/car/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteCar } from "./DeleteCar";
import { Query } from "@/application/types";

describe("deleteCar", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteCarRepository: MockProxy<DeleteCarRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteCarRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteCarRepository.deleteCar.mockResolvedValue(fakeCarEntity);
  });
  beforeEach(() => {
    testInstance = deleteCar(deleteCarRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteCar of DeleteCarRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteCarRepository.deleteCar).toHaveBeenCalledWith(fakeQuery);
    expect(deleteCarRepository.deleteCar).toHaveBeenCalledTimes(1);
  });
  it("should return a new car deleted when deleteCarRepository delete it", async () => {
    const car = await testInstance(fakeQuery);
    expect(car).toEqual(fakeCarEntity);
  });
  it("should return null a new car deleted when deleteCarRepository delete it", async () => {
    deleteCarRepository.deleteCar.mockResolvedValue(null);
    const car = await testInstance(fakeCarEntity);
    expect(car).toBeNull();
  });
  it("should rethrow if deleteCar of DeleteCarRepository throws", async () => {
    deleteCarRepository.deleteCar.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
