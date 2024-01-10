import { AddMapRouteRepository } from "@/slices/mapRoute/repositories";
import { MapRouteEntity, CreateRouteDto } from "@/slices/mapRoute/entities";
import { Directions } from "@/application/infra/maps";
import { handleDirections } from "../handleDirections";

export type AddMapRoute = (data: CreateRouteDto) => Promise<MapRouteEntity | null>;
export type AddMapRouteSignature = (
  addMapRoute: AddMapRouteRepository,
  directions: Directions
) => AddMapRoute;
export const addMapRoute: AddMapRouteSignature =
  (addMapRouteRepository: AddMapRouteRepository, directions: Directions) =>
  async (data: CreateRouteDto) => {
    const mapRoute = await handleDirections(data, directions);
    return addMapRouteRepository.addMapRoute(new MapRouteEntity(mapRoute));
  };
