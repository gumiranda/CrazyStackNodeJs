import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { CategoryRepository } from "@/slices/category/repositories";
import { updateCategory, UpdateCategory } from "@/slices/category/useCases";

export const makeUpdateCategoryFactory = (): UpdateCategory => {
  const repository = new CategoryRepository(
    makeDatabaseInstance(whiteLabel.database, "category")
  );
  return updateCategory(repository);
};
