import { makeDatabaseInstance } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { loadProductByPage, LoadProductByPage } from "@/slices/product/useCases";

export const makeLoadProductByPageFactory = (): LoadProductByPage => {
  const repository = new ProductRepository(makeDatabaseInstance("mongodb", "product"));
  return loadProductByPage(repository);
};
