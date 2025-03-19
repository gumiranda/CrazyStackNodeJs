import { LoadPlaceByPageRepository } from "@/slices/place/repositories";
import { PlacePaginated } from "@/slices/place/entities";
import { Query } from "@/application/types";

export type LoadPlaceByPage = (query: Query) => Promise<PlacePaginated | null>;
export type LoadPlaceByPageSignature = (
    loadPlaceByPage: LoadPlaceByPageRepository
) => LoadPlaceByPage;
export const loadPlaceByPage: LoadPlaceByPageSignature =
    (loadPlaceByPageRepository: LoadPlaceByPageRepository) =>
    async (query: Query) => {
        return loadPlaceByPageRepository.loadPlaceByPage(query);
    };
