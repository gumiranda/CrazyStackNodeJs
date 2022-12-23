import { MongoRepository } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { loadProduct, LoadProduct } from "@/slices/product/useCases";

export const makeLoadProductFactory = (): LoadProduct => {
  const repository = new ProductRepository(new MongoRepository("product"));
  return loadProduct(repository);
};
