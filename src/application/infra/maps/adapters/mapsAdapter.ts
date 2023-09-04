import { Directions, Places } from "@/application/infra/maps/protocols";
import {
  DirectionsRequest,
  Client as GoogleMapsClient,
  PlaceInputType,
  TravelMode,
  FindPlaceFromTextResponseData,
} from "@googlemaps/google-maps-services-js";
import { env } from "@/application/infra/config";

export class MapsAdapter implements Directions, Places {
  constructor(private readonly googleMapsClient: GoogleMapsClient) {
    this.googleMapsClient = googleMapsClient;
  }
  async getDirections(placeOriginId: string, placeDestinationId: string): Promise<any> {
    const requestParams: DirectionsRequest["params"] = {
      origin: `place_id:${placeOriginId.replace("place_id:", "")}`,
      destination: `place_id:${placeDestinationId.replace("place_id:", "")}`,
      mode: TravelMode.driving,
      key: env.googleMapsKey,
    };
    const { data } = await this.googleMapsClient.directions({ params: requestParams });
    return {
      ...data,
      request: {
        origin: {
          place_id: requestParams.origin,
          location: {
            lat: data.routes[0].legs[0].start_location.lat,
            lng: data.routes[0].legs[0].start_location.lng,
          },
        },
        destination: {
          place_id: requestParams.destination,
          location: {
            lat: data.routes[0].legs[0].end_location.lat,
            lng: data.routes[0].legs[0].end_location.lng,
          },
        },
      },
      mode: TravelMode.driving,
    };
  }
  async findPlace(text: string): Promise<FindPlaceFromTextResponseData> {
    const { data } = await this.googleMapsClient.findPlaceFromText({
      params: {
        input: text,
        inputtype: PlaceInputType.textQuery,
        fields: ["place_id", "formatted_address", "geometry", "name"],
        key: env.googleMapsKey,
        locationbias: undefined,
      },
    });
    console.log({ data });
    return data;
  }
}
