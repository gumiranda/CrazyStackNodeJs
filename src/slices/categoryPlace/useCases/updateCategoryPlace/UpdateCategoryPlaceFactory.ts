import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { CategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import { updateCategoryPlace, UpdateCategoryPlace } from "@/slices/categoryPlace/useCases";

export const makeUpdateCategoryPlaceFactory = (): UpdateCategoryPlace => {
  const repository = new CategoryPlaceRepository(makeDatabaseInstance(whiteLabel.database,"categoryPlace"));
  return updateCategoryPlace(repository);
};
