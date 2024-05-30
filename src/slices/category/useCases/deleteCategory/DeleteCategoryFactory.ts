import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { CategoryRepository } from "@/slices/category/repositories";
import { deleteCategory, DeleteCategory } from "@/slices/category/useCases";

export const makeDeleteCategoryFactory = (): DeleteCategory => {
  const repository = new CategoryRepository(
    makeDatabaseInstance(whiteLabel.database, "category")
  );
  return deleteCategory(repository);
};
