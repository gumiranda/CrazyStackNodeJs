import { AddMapRouteRepository } from "@/slices/mapRoute/repositories";
import { MapRouteEntity, MapRouteData } from "@/slices/mapRoute/entities";

export type AddMapRoute = (data: MapRouteData) => Promise<MapRouteEntity | null>;
export type AddMapRouteSignature = (addMapRoute: AddMapRouteRepository) => AddMapRoute;
export const addMapRoute: AddMapRouteSignature =
  (addMapRouteRepository: AddMapRouteRepository) => (data: MapRouteData) => {
    return addMapRouteRepository.addMapRoute(new MapRouteEntity(data));
  };
