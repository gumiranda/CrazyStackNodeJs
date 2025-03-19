import { UpdateCategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import { CategoryPlaceData } from "@/slices/categoryPlace/entities";
import { Query } from "@/application/types";

export type UpdateCategoryPlace = (
    query: Query,
    data: CategoryPlaceData
) => Promise<CategoryPlaceData | null>;
export type UpdateCategoryPlaceSignature = (
    updateCategoryPlace: UpdateCategoryPlaceRepository
) => UpdateCategoryPlace;
export const updateCategoryPlace: UpdateCategoryPlaceSignature =
    (updateCategoryPlaceRepository: UpdateCategoryPlaceRepository) =>
    async (query: Query, data: CategoryPlaceData) => {
        return updateCategoryPlaceRepository.updateCategoryPlace(query, data);
    };
