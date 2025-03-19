import { Query } from "@/application/types";
import { CategoryPlaceData } from "@/slices/categoryPlace/entities";

export interface DeleteCategoryPlaceRepository {
    deleteCategoryPlace(query: Query): Promise<CategoryPlaceData | null>;
}
