import { MongoRepository } from "@/application/infra";
import { CategoryRepository } from "@/slices/category/repositories";
import { loadCategory, LoadCategory } from "@/slices/category/useCases";

export const makeLoadCategoryFactory = (): LoadCategory => {
  const repository = new CategoryRepository(new MongoRepository("category"));
  return loadCategory(repository);
};
