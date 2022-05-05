import { DeleteProductRepository } from "@/slices/product/repositories";
import { ProductData } from "@/slices/product/entities";
import { Query } from "@/application/types";

export type DeleteProduct = (query: Query) => Promise<ProductData | null>;
export type DeleteProductSignature = (
    deleteProduct: DeleteProductRepository
) => DeleteProduct;
export const deleteProduct: DeleteProductSignature =
    (deleteProductRepository: DeleteProductRepository) => (query: Query) => {
        return deleteProductRepository.deleteProduct(query);
    };
