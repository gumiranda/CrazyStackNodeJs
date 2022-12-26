import { LoadCategoryRepository } from "@/slices/category/repositories";
import { CategoryData } from "@/slices/category/entities";
import { Query } from "@/application/types";

export type LoadCategory = (query: Query) => Promise<CategoryData | null>;
export type LoadCategorySignature = (loadCategory: LoadCategoryRepository) => LoadCategory;
export const loadCategory: LoadCategorySignature =
    (loadCategoryRepository: LoadCategoryRepository) => async (query: Query) => {
        return loadCategoryRepository.loadCategory(query);
    };
