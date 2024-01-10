import { UpdateMapRouteRepository } from "@/slices/mapRoute/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import {
  fakeDestinationId,
  fakeDirectionsData,
  fakeMapRouteEntity,
  fakeOriginId,
} from "@/slices/mapRoute/entities/MapRouteEntity.spec";
import { UpdateMapRoute, updateMapRoute } from "./UpdateMapRoute";
import { Directions } from "@/application/infra/maps";
import { TravelMode } from "@googlemaps/google-maps-services-js";
import { CreateRouteDto } from "@/slices/mapRoute/entities/createRouteDto";

describe("UpdateMapRoute", () => {
  let fakeQuery: Query;
  let testInstance: UpdateMapRoute;
  let updateMapRouteRepository: MockProxy<UpdateMapRouteRepository>;
  let directions: MockProxy<Directions>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateMapRouteRepository = mock();
    directions = mock();
    directions.getDirections.mockResolvedValue({
      ...fakeDirectionsData,
      request: {
        origin: {
          place_id: fakeOriginId,
          location: {
            lat: fakeDirectionsData.routes[0].legs[0].start_location.lat,
            lng: fakeDirectionsData.routes[0].legs[0].start_location.lng,
          },
        },
        destination: {
          place_id: fakeDestinationId,
          location: {
            lat: fakeDirectionsData.routes[0].legs[0].end_location.lat,
            lng: fakeDirectionsData.routes[0].legs[0].end_location.lng,
          },
        },
      },
      mode: TravelMode.driving,
    });
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateMapRouteRepository.updateMapRoute.mockResolvedValue(fakeMapRouteEntity);
  });
  beforeEach(() => {
    testInstance = updateMapRoute(updateMapRouteRepository, directions);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateMapRoute of UpdateMapRouteRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeMapRouteEntity as unknown as CreateRouteDto);
    expect(updateMapRouteRepository.updateMapRoute).toHaveBeenCalledWith(
      fakeQuery,
      fakeMapRouteEntity
    );
    expect(updateMapRouteRepository.updateMapRoute).toHaveBeenCalledTimes(1);
  });
  it("should return a mapRoute updateed when updateMapRouteRepository insert it", async () => {
    const mapRoute = await testInstance(
      fakeQuery,
      fakeMapRouteEntity as unknown as CreateRouteDto
    );
    expect(mapRoute).toEqual(fakeMapRouteEntity);
  });
  it("should return null a new mapRoute updateed when updateMapRouteRepository return it", async () => {
    updateMapRouteRepository.updateMapRoute.mockResolvedValue(null);
    const mapRoute = await testInstance(
      fakeQuery,
      fakeMapRouteEntity as unknown as CreateRouteDto
    );
    expect(mapRoute).toBeNull();
  });
  it("should rethrow if updateMapRoute of UpdateMapRouteRepository throws", async () => {
    updateMapRouteRepository.updateMapRoute.mockRejectedValueOnce(new Error("any_error"));
    await expect(
      testInstance(fakeQuery, fakeMapRouteEntity as unknown as CreateRouteDto)
    ).rejects.toThrowError("any_error");
  });
});
