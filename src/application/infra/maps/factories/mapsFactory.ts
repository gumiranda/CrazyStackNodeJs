import { MapsAdapter } from "../adapters";
import { Client as GoogleMapsClient } from "@googlemaps/google-maps-services-js";

export const makeMapsAdapter = (): MapsAdapter => {
  return new MapsAdapter(new GoogleMapsClient());
};
