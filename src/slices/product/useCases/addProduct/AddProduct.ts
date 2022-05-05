import { AddProductRepository } from "@/slices/product/repositories";
import { ProductEntity, ProductData } from "@/slices/product/entities";

export type AddProduct = (data: ProductData) => Promise<ProductEntity | null>;
export type AddProductSignature = (addProduct: AddProductRepository) => AddProduct;
export const addProduct: AddProductSignature =
    (addProductRepository: AddProductRepository) => (data: ProductData) => {
        return addProductRepository.addProduct(new ProductEntity(data));
    };
