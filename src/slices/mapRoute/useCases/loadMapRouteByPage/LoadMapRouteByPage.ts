import { LoadMapRouteByPageRepository } from "@/slices/mapRoute/repositories";
import { MapRoutePaginated } from "@/slices/mapRoute/entities";
import { Query } from "@/application/types";

export type LoadMapRouteByPage = (query: Query) => Promise<MapRoutePaginated | null>;
export type LoadMapRouteByPageSignature = (
  loadMapRouteByPage: LoadMapRouteByPageRepository
) => LoadMapRouteByPage;
export const loadMapRouteByPage: LoadMapRouteByPageSignature =
  (loadMapRouteByPageRepository: LoadMapRouteByPageRepository) => async (query: Query) => {
    return loadMapRouteByPageRepository.loadMapRouteByPage(query);
  };
