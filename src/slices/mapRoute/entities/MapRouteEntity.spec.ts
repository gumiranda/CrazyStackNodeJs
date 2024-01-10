/* eslint-disable quotes */
import { MapRouteEntity } from "./MapRouteEntity";
import MockDate from "mockdate";

export const fakeMapRouteEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeMapRouteEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  source: {
    name: "",
    location: { lat: -33.8674869, lng: 151.2069902 },
  },
  destination: {
    name: "",
    location: { lat: -33.8688197, lng: 151.2092955 },
  },
  distance: 22,
  duration: 0,
  directions:
    '{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"place_id:ChIJN1t_tDeuEmsRUsoyG83frY4","types":["locality","political"]},{"geocoder_status":"OK","place_id":"place_id:ChIJP3Sa8ziYEmsRUKgyFmh9AQM","types":["locality","political"]}],"routes":[{"legs":[{"start_address":"","end_address":"","distance":{"value":22},"start_location":{"lat":-33.8674869,"lng":151.2069902},"end_location":{"lat":-33.8688197,"lng":151.2092955}}]}],"request":{"origin":{"place_id":"place_id:ChIJN1t_tDeuEmsRUsoyG83frY4","location":{"lat":-33.8674869,"lng":151.2069902}},"destination":{"place_id":"place_id:ChIJP3Sa8ziYEmsRUKgyFmh9AQM","location":{"lat":-33.8688197,"lng":151.2092955}}}}',
  routeDriver: [],
};
export const fakeOriginId = "place_id:ChIJN1t_tDeuEmsRUsoyG83frY4";
export const fakeDestinationId = "place_id:ChIJP3Sa8ziYEmsRUKgyFmh9AQM";

export const fakeDirectionsData = {
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
export const fakeMapRoutePaginated = {
  total: 11,
  mapRoutes: [
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
  ],
};

describe("MapRoute", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new MapRouteEntity(fakeMapRouteEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeMapRouteEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
