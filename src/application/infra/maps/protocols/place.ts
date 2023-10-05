import { FindPlaceFromTextResponseData } from "@googlemaps/google-maps-services-js";

export interface Place {
  findPlace(text: string): Promise<FindPlaceFromTextResponseData>;
}
