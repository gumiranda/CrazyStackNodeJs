import { ProductData } from "@/slices/product/entities";

export interface AddProductRepository {
    addProduct(product: ProductData): Promise<ProductData | null>;
}
