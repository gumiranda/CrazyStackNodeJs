import { LoadPlaceByPageGeoNearRepository } from "@/slices/place/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakePlacePaginated } from "@/slices/place/entities/PlaceEntity.spec";
import { LoadPlaceByPageGeoNear, loadPlaceByPageGeoNear } from "./LoadPlaceByPageGeoNear";

describe("LoadPlaceByPageGeoNear", () => {
  let fakeQuery: Query;
  let testInstance: LoadPlaceByPageGeoNear;
  let loadPlaceByPageGeoNearRepository: MockProxy<LoadPlaceByPageGeoNearRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadPlaceByPageGeoNearRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadPlaceByPageGeoNearRepository.loadPlaceByPageGeoNear.mockResolvedValue(
      fakePlacePaginated
    );
  });
  beforeEach(() => {
    testInstance = loadPlaceByPageGeoNear(loadPlaceByPageGeoNearRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadPlaceByPageGeoNear of LoadPlaceByPageGeoNearRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadPlaceByPageGeoNearRepository.loadPlaceByPageGeoNear).toHaveBeenCalledWith(
      fakeQuery
    );
    expect(loadPlaceByPageGeoNearRepository.loadPlaceByPageGeoNear).toHaveBeenCalledTimes(
      1
    );
  });
  it("should return a place loaded when loadPlaceByPageGeoNearRepository insert it", async () => {
    const place = await testInstance(fakeQuery);
    expect(place).toEqual(fakePlacePaginated);
  });
  it("should return null a new place loaded when loadPlaceByPageGeoNearRepository return it", async () => {
    loadPlaceByPageGeoNearRepository.loadPlaceByPageGeoNear.mockResolvedValue(null);
    const place = await testInstance(fakeQuery);
    expect(place).toBeNull();
  });
  it("should rethrow if loadPlaceByPageGeoNear of LoadPlaceByPageGeoNearRepository throws", async () => {
    loadPlaceByPageGeoNearRepository.loadPlaceByPageGeoNear.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
