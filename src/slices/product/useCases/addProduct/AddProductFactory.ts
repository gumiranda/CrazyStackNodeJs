import { makeDatabaseInstance } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { addProduct, AddProduct } from "@/slices/product/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddProductFactory = (): AddProduct => {
  const repository = new ProductRepository(
    makeDatabaseInstance(whiteLabel.database, "product")
  );
  return addProduct(repository);
};
