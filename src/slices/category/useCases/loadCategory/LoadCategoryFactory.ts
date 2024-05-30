import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { CategoryRepository } from "@/slices/category/repositories";
import { loadCategory, LoadCategory } from "@/slices/category/useCases";

export const makeLoadCategoryFactory = (): LoadCategory => {
  const repository = new CategoryRepository(
    makeDatabaseInstance(whiteLabel.database, "category")
  );
  return loadCategory(repository);
};
