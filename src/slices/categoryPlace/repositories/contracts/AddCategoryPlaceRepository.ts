import { CategoryPlaceData } from "@/slices/categoryPlace/entities";

export interface AddCategoryPlaceRepository {
    addCategoryPlace(categoryPlace: CategoryPlaceData): Promise<CategoryPlaceData | null>;
}
