import { makeDatabaseInstance } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { addProduct, AddProduct } from "@/slices/product/useCases";

export const makeAddProductFactory = (): AddProduct => {
  const repository = new ProductRepository(makeDatabaseInstance("mongodb", "product"));
  return addProduct(repository);
};
