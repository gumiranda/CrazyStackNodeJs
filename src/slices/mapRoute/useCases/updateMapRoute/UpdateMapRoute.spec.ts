import { UpdateMapRouteRepository } from "@/slices/mapRoute/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeMapRouteEntity } from "@/slices/mapRoute/entities/MapRouteEntity.spec";
import { UpdateMapRoute, updateMapRoute } from "./UpdateMapRoute";

describe("UpdateMapRoute", () => {
  let fakeQuery: Query;
  let testInstance: UpdateMapRoute;
  let updateMapRouteRepository: MockProxy<UpdateMapRouteRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateMapRouteRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateMapRouteRepository.updateMapRoute.mockResolvedValue(fakeMapRouteEntity);
  });
  beforeEach(() => {
    testInstance = updateMapRoute(updateMapRouteRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateMapRoute of UpdateMapRouteRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeMapRouteEntity);
    expect(updateMapRouteRepository.updateMapRoute).toHaveBeenCalledWith(
      fakeQuery,
      fakeMapRouteEntity
    );
    expect(updateMapRouteRepository.updateMapRoute).toHaveBeenCalledTimes(1);
  });
  it("should return a mapRoute updateed when updateMapRouteRepository insert it", async () => {
    const mapRoute = await testInstance(fakeQuery, fakeMapRouteEntity);
    expect(mapRoute).toEqual(fakeMapRouteEntity);
  });
  it("should return null a new mapRoute updateed when updateMapRouteRepository return it", async () => {
    updateMapRouteRepository.updateMapRoute.mockResolvedValue(null);
    const mapRoute = await testInstance(fakeQuery, fakeMapRouteEntity);
    expect(mapRoute).toBeNull();
  });
  it("should rethrow if updateMapRoute of UpdateMapRouteRepository throws", async () => {
    updateMapRouteRepository.updateMapRoute.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeMapRouteEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
