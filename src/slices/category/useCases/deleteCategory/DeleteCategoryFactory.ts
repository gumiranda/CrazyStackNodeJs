import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { CategoryRepository } from "@/slices/category/repositories";
import { deleteCategory, DeleteCategory } from "@/slices/category/useCases";

export const makeDeleteCategoryFactory = (): DeleteCategory => {
  const repository = new CategoryRepository(
    makeDatabaseInstance(whiteLabel.database, "category")
  );
  return deleteCategory(repository);
};
