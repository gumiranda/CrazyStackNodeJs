import { makeDatabaseInstance } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { loadProduct, LoadProduct } from "@/slices/product/useCases";

export const makeLoadProductFactory = (): LoadProduct => {
  const repository = new ProductRepository(makeDatabaseInstance("mongodb", "product"));
  return loadProduct(repository);
};
