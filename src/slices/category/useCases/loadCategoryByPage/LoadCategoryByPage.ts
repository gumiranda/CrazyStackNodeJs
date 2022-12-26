import { LoadCategoryByPageRepository } from "@/slices/category/repositories";
import { CategoryPaginated } from "@/slices/category/entities";
import { Query } from "@/application/types";

export type LoadCategoryByPage = (query: Query) => Promise<CategoryPaginated | null>;
export type LoadCategoryByPageSignature = (
    loadCategoryByPage: LoadCategoryByPageRepository
) => LoadCategoryByPage;
export const loadCategoryByPage: LoadCategoryByPageSignature =
    (loadCategoryByPageRepository: LoadCategoryByPageRepository) =>
    async (query: Query) => {
        return loadCategoryByPageRepository.loadCategoryByPage(query);
    };
