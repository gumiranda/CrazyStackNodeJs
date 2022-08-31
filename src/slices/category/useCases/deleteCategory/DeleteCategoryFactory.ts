import { MongoRepository } from "@/application/infra";
import { CategoryRepository } from "@/slices/category/repositories";
import { deleteCategory, DeleteCategory } from "@/slices/category/useCases";

export const makeDeleteCategoryFactory = (): DeleteCategory => {
  const repository = new CategoryRepository(new MongoRepository("category"));
  return deleteCategory(repository);
};
