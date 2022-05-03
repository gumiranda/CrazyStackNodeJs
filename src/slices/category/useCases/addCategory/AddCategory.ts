import { AddCategoryRepository } from "@/slices/category/repositories";
import { CategoryEntity, CategoryData } from "@/slices/category/entities";

export type AddCategory = (data: CategoryData) => Promise<CategoryEntity | null>;
export type AddCategorySignature = (addCategory: AddCategoryRepository) => AddCategory;
export const addCategory: AddCategorySignature =
    (addCategoryRepository: AddCategoryRepository) => (data: CategoryData) => {
        return addCategoryRepository.addCategory(new CategoryEntity(data));
    };
