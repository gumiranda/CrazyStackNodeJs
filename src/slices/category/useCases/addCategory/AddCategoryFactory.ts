import { MongoRepository } from "@/application/infra";
import { CategoryRepository } from "@/slices/category/repositories";
import { addCategory, AddCategory } from "@/slices/category/useCases";

export const makeAddCategoryFactory = (): AddCategory => {
  const repository = new CategoryRepository(new MongoRepository("category"));
  return addCategory(repository);
};
