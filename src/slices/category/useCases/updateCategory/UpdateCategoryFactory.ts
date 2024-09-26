import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { CategoryRepository } from "@/slices/category/repositories";
import { updateCategory, UpdateCategory } from "@/slices/category/useCases";

export const makeUpdateCategoryFactory = (): UpdateCategory => {
  const repository = new CategoryRepository(
    makeDatabaseInstance(whiteLabel.database, "category")
  );
  return updateCategory(repository);
};
