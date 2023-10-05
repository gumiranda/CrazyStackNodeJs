import { LoadCarRepository } from "@/slices/car/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCarEntity } from "@/slices/car/entities/CarEntity.spec";
import { LoadCar, loadCar } from "./LoadCar";

describe("LoadCar", () => {
  let fakeQuery: Query;
  let testInstance: LoadCar;
  let loadCarRepository: MockProxy<LoadCarRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadCarRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadCarRepository.loadCar.mockResolvedValue(fakeCarEntity);
  });
  beforeEach(() => {
    testInstance = loadCar(loadCarRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadCar of LoadCarRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadCarRepository.loadCar).toHaveBeenCalledWith(fakeQuery);
    expect(loadCarRepository.loadCar).toHaveBeenCalledTimes(1);
  });
  it("should return a car loaded when loadCarRepository insert it", async () => {
    const car = await testInstance(fakeQuery);
    expect(car).toEqual(fakeCarEntity);
  });
  it("should return null a new car loaded when loadCarRepository return it", async () => {
    loadCarRepository.loadCar.mockResolvedValue(null);
    const car = await testInstance(fakeQuery);
    expect(car).toBeNull();
  });
  it("should rethrow if loadCar of LoadCarRepository throws", async () => {
    loadCarRepository.loadCar.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
