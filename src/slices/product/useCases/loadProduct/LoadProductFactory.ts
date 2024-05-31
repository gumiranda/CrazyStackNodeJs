import { makeDatabaseInstance } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { loadProduct, LoadProduct } from "@/slices/product/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadProductFactory = (): LoadProduct => {
  const repository = new ProductRepository(
    makeDatabaseInstance(whiteLabel.database, "product")
  );
  return loadProduct(repository);
};
