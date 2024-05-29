import { makeDatabaseInstance } from "@/application/infra";
import { CategoryRepository } from "@/slices/category/repositories";
import { loadCategoryByPage, LoadCategoryByPage } from "@/slices/category/useCases";

export const makeLoadCategoryByPageFactory = (): LoadCategoryByPage => {
  const repository = new CategoryRepository(makeDatabaseInstance("mongodb", "category"));
  return loadCategoryByPage(repository);
};
