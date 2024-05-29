import { makeDatabaseInstance } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { updateProduct, UpdateProduct } from "@/slices/product/useCases";

export const makeUpdateProductFactory = (): UpdateProduct => {
  const repository = new ProductRepository(makeDatabaseInstance("mongodb", "product"));
  return updateProduct(repository);
};
