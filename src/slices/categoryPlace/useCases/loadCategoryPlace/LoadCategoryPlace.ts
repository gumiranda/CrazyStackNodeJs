import { LoadCategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import { CategoryPlaceData } from "@/slices/categoryPlace/entities";
import { Query } from "@/application/types";

export type LoadCategoryPlace = (query: Query) => Promise<CategoryPlaceData | null>;
export type LoadCategoryPlaceSignature = (loadCategoryPlace: LoadCategoryPlaceRepository) => LoadCategoryPlace;
export const loadCategoryPlace: LoadCategoryPlaceSignature =
    (loadCategoryPlaceRepository: LoadCategoryPlaceRepository) => async (query: Query) => {
        return loadCategoryPlaceRepository.loadCategoryPlace(query);
    };
