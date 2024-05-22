import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { CategoryRepository } from "@/slices/category/repositories";
import { addCategory, AddCategory } from "@/slices/category/useCases";

export const makeAddCategoryFactory = (): AddCategory => {
  const repository = new CategoryRepository(
    makeDatabaseInstance(whiteLabel.database, "category")
  );
  return addCategory(repository);
};
