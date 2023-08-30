import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";

export interface DeleteCategoryRepository {
  deleteCategory(query: Query): Promise<CategoryData | null>;
}
