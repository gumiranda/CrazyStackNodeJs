import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { CategoryRepository } from "@/slices/category/repositories";
import { loadCategoryByPage, LoadCategoryByPage } from "@/slices/category/useCases";

export const makeLoadCategoryByPageFactory = (): LoadCategoryByPage => {
  const repository = new CategoryRepository(
    makeDatabaseInstance(whiteLabel.database, "category")
  );
  return loadCategoryByPage(repository);
};
