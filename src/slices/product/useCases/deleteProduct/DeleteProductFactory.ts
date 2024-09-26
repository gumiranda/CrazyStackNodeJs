import { makeDatabaseInstance } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { deleteProduct, DeleteProduct } from "@/slices/product/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteProductFactory = (): DeleteProduct => {
  const repository = new ProductRepository(
    makeDatabaseInstance(whiteLabel.database, "product")
  );
  return deleteProduct(repository);
};
