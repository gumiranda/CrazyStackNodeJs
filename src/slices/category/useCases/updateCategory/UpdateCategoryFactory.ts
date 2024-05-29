import { makeDatabaseInstance } from "@/application/infra";
import { CategoryRepository } from "@/slices/category/repositories";
import { updateCategory, UpdateCategory } from "@/slices/category/useCases";

export const makeUpdateCategoryFactory = (): UpdateCategory => {
  const repository = new CategoryRepository(makeDatabaseInstance("mongodb", "category"));
  return updateCategory(repository);
};
