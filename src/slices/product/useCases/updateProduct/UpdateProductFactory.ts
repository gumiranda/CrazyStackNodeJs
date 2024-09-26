import { makeDatabaseInstance } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { updateProduct, UpdateProduct } from "@/slices/product/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateProductFactory = (): UpdateProduct => {
  const repository = new ProductRepository(
    makeDatabaseInstance(whiteLabel.database, "product")
  );
  return updateProduct(repository);
};
