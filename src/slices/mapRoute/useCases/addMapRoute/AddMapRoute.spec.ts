import { fakeMapRouteEntity } from "@/slices/mapRoute/entities/MapRouteEntity.spec";
import { MapRouteEntity } from "@/slices/mapRoute/entities";
import { AddMapRouteRepository } from "@/slices/mapRoute/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addMapRoute } from "./AddMapRoute";
import { Directions } from "@/application/infra/maps";
import { TravelMode } from "@googlemaps/google-maps-services-js";
const fakeOriginId = "place_id:ChIJN1t_tDeuEmsRUsoyG83frY4";
const fakeDestinationId = "place_id:ChIJP3Sa8ziYEmsRUKgyFmh9AQM";

const fakeDirectionsData = {
  geocoded_waypoints: [
    {
      geocoder_status: "OK",
      place_id: fakeOriginId,
      types: ["locality", "political"],
    },
    {
      geocoder_status: "OK",
      place_id: fakeDestinationId,
      types: ["locality", "political"],
    },
  ],
  routes: [
    {
      legs: [
        {
          start_address: "",
          end_address: "",
          distance: { value: 22 },
          start_location: {
            lat: -33.8674869,
            lng: 151.2069902,
          },
          end_location: {
            lat: -33.8688197,
            lng: 151.2092955,
          },
        },
      ],
    },
  ],
};
describe("addMapRoute", () => {
  let testInstance: any;
  let addMapRouteRepository: MockProxy<AddMapRouteRepository>;
  let directions: MockProxy<Directions>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addMapRouteRepository = mock();
    directions = mock();
    addMapRouteRepository.addMapRoute.mockResolvedValue(fakeMapRouteEntity);
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
  });
  beforeEach(() => {
    testInstance = addMapRoute(addMapRouteRepository, directions);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addMapRoute of AddMapRouteRepository with correct values", async () => {
    await testInstance(fakeMapRouteEntity);
    expect(addMapRouteRepository.addMapRoute).toHaveBeenCalledWith(
      new MapRouteEntity({
        ...fakeMapRouteEntity,
      })
    );
    expect(addMapRouteRepository.addMapRoute).toHaveBeenCalledTimes(1);
  });
  it("should return a new mapRoute created when addMapRouteRepository insert it", async () => {
    const mapRoute = await testInstance(fakeMapRouteEntity);
    expect(mapRoute).toEqual(fakeMapRouteEntity);
  });
  it("should return null a new mapRoute created when addMapRouteRepository insert it", async () => {
    addMapRouteRepository.addMapRoute.mockResolvedValue(null);
    const mapRoute = await testInstance(fakeMapRouteEntity);
    expect(mapRoute).toBeNull();
  });
  it("should rethrow if addMapRoute of AddMapRouteRepository throws", async () => {
    addMapRouteRepository.addMapRoute.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeMapRouteEntity)).rejects.toThrowError("any_error");
  });
});
