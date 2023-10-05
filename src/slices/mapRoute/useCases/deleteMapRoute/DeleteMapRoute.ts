import { DeleteMapRouteRepository } from "@/slices/mapRoute/repositories";
import { MapRouteData } from "@/slices/mapRoute/entities";
import { Query } from "@/application/types";

export type DeleteMapRoute = (query: Query) => Promise<MapRouteData | null>;
export type DeleteMapRouteSignature = (
  deleteMapRoute: DeleteMapRouteRepository
) => DeleteMapRoute;
export const deleteMapRoute: DeleteMapRouteSignature =
  (deleteMapRouteRepository: DeleteMapRouteRepository) => (query: Query) => {
    return deleteMapRouteRepository.deleteMapRoute(query);
  };
