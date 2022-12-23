import { Query } from "@/application/types";
import { CategoryPaginated } from "@/slices/category/entities";

export interface LoadCategoryByPageRepository {
  loadCategoryByPage(query: Query): Promise<CategoryPaginated | null>;
}
