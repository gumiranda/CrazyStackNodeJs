import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { CategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import { deleteCategoryPlace, DeleteCategoryPlace } from "@/slices/categoryPlace/useCases";

export const makeDeleteCategoryPlaceFactory = (): DeleteCategoryPlace => {
  const repository = new CategoryPlaceRepository(makeDatabaseInstance(whiteLabel.database,"categoryPlace"));
  return deleteCategoryPlace(repository);
};
