import {
  DirectionsResponse,
  FindPlaceFromTextResponse,
  Client as GoogleMapsClient,
  PlaceInputType,
  TravelMode,
} from "@googlemaps/google-maps-services-js";
import { env } from "@/application/infra/config";
import { mock, MockProxy } from "jest-mock-extended";
import { MapsAdapter } from "./mapsAdapter";

jest.mock("@googlemaps/google-maps-services-js");

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
const fakeText = "Sydney Opera House";
const fakePlaceData = {
  candidates: [
    {
      formatted_address: "Bennelong Point, Sydney NSW 2000, Australia",
      geometry: {
        location: {
          lat: -33.8567844,
          lng: 151.2152967,
        },
        viewport: {
          northeast: {
            lat: -33.8553374,
            lng: 151.2167413,
          },
          southwest: {
            lat: -33.8582149,
            lng: 151.2138942,
          },
        },
      },
      name: "Sydney Opera House",
      place_id: "ChIJrTLr-GyuEmsRBfy61i59si0",
    },
  ],
};
describe("MapsAdapter", () => {
  let mockedGoogleMapsClient: MockProxy<GoogleMapsClient>;
  let testInstance: MapsAdapter;
  beforeAll(async () => {
    mockedGoogleMapsClient = mock();
  });
  beforeEach(() => {
    testInstance = new MapsAdapter(mockedGoogleMapsClient);
  });
  describe("getDirections", () => {
    it("should return the correct data when given two valid place ids", async () => {
      mockedGoogleMapsClient.directions.mockResolvedValue({
        data: fakeDirectionsData,
      } as DirectionsResponse);
      const result = await testInstance.getDirections(fakeOriginId, fakeDestinationId);
      expect(result).toEqual({
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
      expect(mockedGoogleMapsClient.directions).toHaveBeenCalledTimes(1);
      expect(mockedGoogleMapsClient.directions).toHaveBeenCalledWith({
        params: {
          origin: `place_id:${fakeOriginId.replace("place_id:", "")}`,
          destination: `place_id:${fakeDestinationId.replace("place_id:", "")}`,
          mode: TravelMode.driving,
          key: env.googleMapsKey,
        },
      });
    });
    it("should throw an error when given an invalid place id", async () => {
      mockedGoogleMapsClient.directions.mockRejectedValue(new Error("Invalid place id"));
      const result = testInstance.getDirections(fakeOriginId, "invalid");
      await expect(result).rejects.toThrow("Invalid place id");
      expect(mockedGoogleMapsClient.directions).toHaveBeenCalledTimes(1);
      expect(mockedGoogleMapsClient.directions).toHaveBeenCalledWith({
        params: {
          origin: `place_id:${fakeOriginId.replace("place_id:", "")}`,
          destination: "place_id:invalid",
          mode: TravelMode.driving,
          key: env.googleMapsKey,
        },
      });
    });
  });
  describe("findPlace", () => {
    it("should return the correct data when given a valid text", async () => {
      mockedGoogleMapsClient.findPlaceFromText.mockResolvedValue({
        data: fakePlaceData,
      } as FindPlaceFromTextResponse);
      const result = await testInstance.findPlace(fakeText);
      expect(result).toEqual(fakePlaceData);
      expect(mockedGoogleMapsClient.findPlaceFromText).toHaveBeenCalledTimes(1);
      expect(mockedGoogleMapsClient.findPlaceFromText).toHaveBeenCalledWith({
        params: {
          input: fakeText,
          inputtype: PlaceInputType.textQuery,
          fields: ["place_id", "formatted_address", "geometry", "name"],
          key: env.googleMapsKey,
        },
      });
    });
    it("should throw an error when given an invalid text", async () => {
      mockedGoogleMapsClient.findPlaceFromText.mockRejectedValue(
        new Error("Invalid text")
      );
      const result = testInstance.findPlace("");
      await expect(result).rejects.toThrow("Invalid text");
      expect(mockedGoogleMapsClient.findPlaceFromText).toHaveBeenCalledTimes(1);
      expect(mockedGoogleMapsClient.findPlaceFromText).toHaveBeenCalledWith({
        params: {
          input: "",
          inputtype: PlaceInputType.textQuery,
          fields: ["place_id", "formatted_address", "geometry", "name"],
          key: env.googleMapsKey,
        },
      });
    });
  });
});
