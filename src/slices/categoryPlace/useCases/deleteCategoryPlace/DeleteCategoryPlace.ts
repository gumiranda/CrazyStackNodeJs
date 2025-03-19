import { DeleteCategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import { CategoryPlaceData } from "@/slices/categoryPlace/entities";
import { Query } from "@/application/types";

export type DeleteCategoryPlace = (query: Query) => Promise<CategoryPlaceData | null>;
export type DeleteCategoryPlaceSignature = (
    deleteCategoryPlace: DeleteCategoryPlaceRepository
) => DeleteCategoryPlace;
export const deleteCategoryPlace: DeleteCategoryPlaceSignature =
    (deleteCategoryPlaceRepository: DeleteCategoryPlaceRepository) => (query: Query) => {
        return deleteCategoryPlaceRepository.deleteCategoryPlace(query);
    };
