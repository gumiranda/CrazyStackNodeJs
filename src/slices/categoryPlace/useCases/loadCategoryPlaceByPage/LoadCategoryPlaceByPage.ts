import { LoadCategoryPlaceByPageRepository } from "@/slices/categoryPlace/repositories";
import { CategoryPlacePaginated } from "@/slices/categoryPlace/entities";
import { Query } from "@/application/types";

export type LoadCategoryPlaceByPage = (query: Query) => Promise<CategoryPlacePaginated | null>;
export type LoadCategoryPlaceByPageSignature = (
    loadCategoryPlaceByPage: LoadCategoryPlaceByPageRepository
) => LoadCategoryPlaceByPage;
export const loadCategoryPlaceByPage: LoadCategoryPlaceByPageSignature =
    (loadCategoryPlaceByPageRepository: LoadCategoryPlaceByPageRepository) =>
    async (query: Query) => {
        return loadCategoryPlaceByPageRepository.loadCategoryPlaceByPage(query);
    };
