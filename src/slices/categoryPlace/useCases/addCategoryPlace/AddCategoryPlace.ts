import { AddCategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import { CategoryPlaceEntity, CategoryPlaceData } from "@/slices/categoryPlace/entities";

export type AddCategoryPlace = (data: CategoryPlaceData) => Promise<CategoryPlaceEntity | null>;
export type AddCategoryPlaceSignature = (addCategoryPlace: AddCategoryPlaceRepository) => AddCategoryPlace;
export const addCategoryPlace: AddCategoryPlaceSignature =
    (addCategoryPlaceRepository: AddCategoryPlaceRepository) => (data: CategoryPlaceData) => {
        return addCategoryPlaceRepository.addCategoryPlace(new CategoryPlaceEntity(data));
    };
