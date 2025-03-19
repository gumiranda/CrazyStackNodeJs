import { Query } from "@/application/types";
import { CategoryPlaceData } from "@/slices/categoryPlace/entities";

export interface LoadCategoryPlaceRepository {
    loadCategoryPlace(query: Query): Promise<CategoryPlaceData | null>;
}
