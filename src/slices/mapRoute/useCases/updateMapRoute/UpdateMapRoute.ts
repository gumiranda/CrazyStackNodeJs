import { UpdateMapRouteRepository } from "@/slices/mapRoute/repositories";
import { MapRouteData } from "@/slices/mapRoute/entities";
import { Query } from "@/application/types";

export type UpdateMapRoute = (
  query: Query,
  data: MapRouteData
) => Promise<MapRouteData | null>;
export type UpdateMapRouteSignature = (
  updateMapRoute: UpdateMapRouteRepository
) => UpdateMapRoute;
export const updateMapRoute: UpdateMapRouteSignature =
  (updateMapRouteRepository: UpdateMapRouteRepository) =>
  async (query: Query, data: MapRouteData) => {
    return updateMapRouteRepository.updateMapRoute(query, data);
  };
