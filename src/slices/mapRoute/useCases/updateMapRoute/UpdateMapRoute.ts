import { UpdateMapRouteRepository } from "@/slices/mapRoute/repositories";
import { CreateRouteDto, MapRouteData } from "@/slices/mapRoute/entities";
import { Query } from "@/application/types";
import { Directions } from "@/application/infra/maps";
import { handleDirections } from "../handleDirections";

export type UpdateMapRoute = (
  query: Query,
  data: CreateRouteDto
) => Promise<MapRouteData | null>;
export type UpdateMapRouteSignature = (
  updateMapRoute: UpdateMapRouteRepository,
  directions: Directions
) => UpdateMapRoute;
export const updateMapRoute: UpdateMapRouteSignature =
  (updateMapRouteRepository: UpdateMapRouteRepository, directions: Directions) =>
  async (query: Query, data: CreateRouteDto) => {
    const mapRoute = await handleDirections(data, directions);
    return updateMapRouteRepository.updateMapRoute(query, mapRoute);
  };
