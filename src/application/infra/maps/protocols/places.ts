import { FindPlaceFromTextResponseData } from "@googlemaps/google-maps-services-js";

export interface Places {
  findPlace(text: string): Promise<FindPlaceFromTextResponseData>;
}
