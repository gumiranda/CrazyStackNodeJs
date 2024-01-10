import { CreateRouteDto } from "@/slices/mapRoute/entities";
import { Directions } from "@/application/infra/maps";
export async function handleDirections(data: CreateRouteDto, directions: Directions) {
  const { destination_id, source_id } = data;
  const { available_travel_modes, geocoded_waypoints, routes, request } =
    await directions.getDirections(source_id, destination_id);
  const legs = routes[0].legs[0];
  const {
    start_address,
    start_location,
    end_location,
    end_address,
    distance,
    duration = 0,
  } = legs;
  return {
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
    duration: duration?.value ?? 0,
    routeDriver: [],
    directions: JSON.stringify({
      available_travel_modes,
      geocoded_waypoints,
      routes,
      request,
    }),
  };
}
