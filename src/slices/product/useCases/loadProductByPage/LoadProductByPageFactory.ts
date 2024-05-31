import { makeDatabaseInstance } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { loadProductByPage, LoadProductByPage } from "@/slices/product/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadProductByPageFactory = (): LoadProductByPage => {
  const repository = new ProductRepository(
    makeDatabaseInstance(whiteLabel.database, "product")
  );
  return loadProductByPage(repository);
};
