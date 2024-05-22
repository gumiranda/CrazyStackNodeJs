import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { CategoryRepository } from "@/slices/category/repositories";
import { loadCategoryByPage, LoadCategoryByPage } from "@/slices/category/useCases";

export const makeLoadCategoryByPageFactory = (): LoadCategoryByPage => {
  const repository = new CategoryRepository(
    makeDatabaseInstance(whiteLabel.database, "category")
  );
  return loadCategoryByPage(repository);
};
