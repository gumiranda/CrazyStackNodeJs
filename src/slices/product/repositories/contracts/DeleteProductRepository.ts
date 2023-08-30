import { Query } from "@/application/types";
import { ProductData } from "@/slices/product/entities";

export interface DeleteProductRepository {
  deleteProduct(query: Query): Promise<ProductData | null>;
}
