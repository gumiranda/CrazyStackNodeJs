import { LoadMapRouteRepository } from "@/slices/mapRoute/repositories";
import { MapRouteData } from "@/slices/mapRoute/entities";
import { Query } from "@/application/types";

export type LoadMapRoute = (query: Query) => Promise<MapRouteData | null>;
export type LoadMapRouteSignature = (loadMapRoute: LoadMapRouteRepository) => LoadMapRoute;
export const loadMapRoute: LoadMapRouteSignature =
  (loadMapRouteRepository: LoadMapRouteRepository) => async (query: Query) => {
    return loadMapRouteRepository.loadMapRoute(query);
  };
