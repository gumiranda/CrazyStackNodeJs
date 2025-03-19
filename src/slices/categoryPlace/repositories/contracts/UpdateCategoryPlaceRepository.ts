import { Query } from "@/application/types";
import { CategoryPlaceData } from "@/slices/categoryPlace/entities";

export interface UpdateCategoryPlaceRepository {
    updateCategoryPlace(query: Query, data: CategoryPlaceData): Promise<CategoryPlaceData | null>;
}
