import { LoadCarByPageRepository } from "@/slices/car/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCarPaginated } from "@/slices/car/entities/CarEntity.spec";
import { LoadCarByPage, loadCarByPage } from "./LoadCarByPage";

describe("LoadCarByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadCarByPage;
  let loadCarByPageRepository: MockProxy<LoadCarByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadCarByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadCarByPageRepository.loadCarByPage.mockResolvedValue(fakeCarPaginated);
  });
  beforeEach(() => {
    testInstance = loadCarByPage(loadCarByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadCarByPage of LoadCarByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadCarByPageRepository.loadCarByPage).toHaveBeenCalledWith(fakeQuery);
    expect(loadCarByPageRepository.loadCarByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a car loaded when loadCarByPageRepository insert it", async () => {
    const car = await testInstance(fakeQuery);
    expect(car).toEqual(fakeCarPaginated);
  });
  it("should return null a new car loaded when loadCarByPageRepository return it", async () => {
    loadCarByPageRepository.loadCarByPage.mockResolvedValue(null);
    const car = await testInstance(fakeQuery);
    expect(car).toBeNull();
  });
  it("should rethrow if loadCarByPage of LoadCarByPageRepository throws", async () => {
    loadCarByPageRepository.loadCarByPage.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
