import { CategoryData } from "@/slices/category/entities";

export interface AddCategoryRepository {
    addCategory(category: CategoryData): Promise<CategoryData | null>;
}
