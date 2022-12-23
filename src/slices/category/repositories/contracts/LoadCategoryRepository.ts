import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";

export interface LoadCategoryRepository {
  loadCategory(query: Query): Promise<CategoryData | null>;
}
