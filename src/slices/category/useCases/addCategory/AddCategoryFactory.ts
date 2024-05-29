import { makeDatabaseInstance } from "@/application/infra";
import { CategoryRepository } from "@/slices/category/repositories";
import { addCategory, AddCategory } from "@/slices/category/useCases";

export const makeAddCategoryFactory = (): AddCategory => {
  const repository = new CategoryRepository(makeDatabaseInstance("mongodb", "category"));
  return addCategory(repository);
};
