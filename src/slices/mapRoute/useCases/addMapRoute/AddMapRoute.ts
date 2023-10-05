import { AddMapRouteRepository } from "@/slices/mapRoute/repositories";
import { MapRouteEntity, MapRouteData, CreateRouteDto } from "@/slices/mapRoute/entities";
import { Directions } from "@/application/infra/maps";

export type AddMapRoute = (data: CreateRouteDto) => Promise<MapRouteEntity | null>;
export type AddMapRouteSignature = (
  addMapRoute: AddMapRouteRepository,
  directions: Directions
) => AddMapRoute;
export const addMapRoute: AddMapRouteSignature =
  (addMapRouteRepository: AddMapRouteRepository, directions: Directions) =>
  async (data: CreateRouteDto) => {
    const { destination_id, source_id } = data;
    const { available_travel_modes, geocoded_waypoints, routes, request } =
      await directions.getDirections(source_id, destination_id);
    const legs = routes[0].legs[0];
    const { start_address, start_location, end_location, end_address, distance } = legs;
    const mapRoute = {
      ...data,
      source: {
        name: start_address,
        location: { lat: start_location.lat, lng: start_location.lng },
      },
      destination: {
        name: end_address,
        location: { lat: end_location.lat, lng: end_location.lng },
      },
      distance: distance.value,
      duration: 0,
      routeDriver: [],
      directions: JSON.stringify({
        available_travel_modes,
        geocoded_waypoints,
        routes,
        request,
      }),
    };
    return addMapRouteRepository.addMapRoute(new MapRouteEntity(mapRoute));
  };
