import { MongoRepository } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { loadProductByPage, LoadProductByPage } from "@/slices/product/useCases";

export const makeLoadProductByPageFactory = (): LoadProductByPage => {
  const repository = new ProductRepository(new MongoRepository("product"));
  return loadProductByPage(repository);
};
