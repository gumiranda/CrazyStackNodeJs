import { LoadPlaceByPageGeoNearRepository } from "@/slices/place/repositories";
import { PlacePaginated } from "@/slices/place/entities";
import { Query } from "@/application/types";

export type LoadPlaceByPageGeoNear = (query: Query) => Promise<PlacePaginated | null>;
export type LoadPlaceByPageGeoNearSignature = (
  loadPlaceByPageGeoNear: LoadPlaceByPageGeoNearRepository
) => LoadPlaceByPageGeoNear;
export const loadPlaceByPageGeoNear: LoadPlaceByPageGeoNearSignature =
  (loadPlaceByPageGeoNearRepository: LoadPlaceByPageGeoNearRepository) =>
  async (query: Query) => {
    return loadPlaceByPageGeoNearRepository.loadPlaceByPageGeoNear(query);
  };
