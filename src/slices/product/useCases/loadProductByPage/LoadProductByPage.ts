import { LoadProductByPageRepository } from "@/slices/product/repositories";
import { ProductPaginated } from "@/slices/product/entities";
import { Query } from "@/application/types";

export type LoadProductByPage = (query: Query) => Promise<ProductPaginated | null>;
export type LoadProductByPageSignature = (
    loadProductByPage: LoadProductByPageRepository
) => LoadProductByPage;
export const loadProductByPage: LoadProductByPageSignature =
    (loadProductByPageRepository: LoadProductByPageRepository) =>
    async (query: Query) => {
        return loadProductByPageRepository.loadProductByPage(query);
    };
