import { Query } from "@/application/types";
import { ProductData } from "@/slices/product/entities";

export interface UpdateProductRepository {
  updateProduct(query: Query, data: ProductData): Promise<ProductData | null>;
}
