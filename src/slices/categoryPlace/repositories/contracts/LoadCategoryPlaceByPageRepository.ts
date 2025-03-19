import { Query } from "@/application/types";
import { CategoryPlacePaginated } from "@/slices/categoryPlace/entities";

export interface LoadCategoryPlaceByPageRepository {
    loadCategoryPlaceByPage(query: Query): Promise<CategoryPlacePaginated | null>;
}
