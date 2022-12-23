import { Query } from "@/application/types";
import { ProductData } from "@/slices/product/entities";

export interface LoadProductRepository {
  loadProduct(query: Query): Promise<ProductData | null>;
}
