import { MongoRepository } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { addProduct, AddProduct } from "@/slices/product/useCases";

export const makeAddProductFactory = (): AddProduct => {
  const repository = new ProductRepository(new MongoRepository("product"));
  return addProduct(repository);
};
