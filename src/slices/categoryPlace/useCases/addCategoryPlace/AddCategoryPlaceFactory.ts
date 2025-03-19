import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { CategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import { addCategoryPlace, AddCategoryPlace } from "@/slices/categoryPlace/useCases";

export const makeAddCategoryPlaceFactory = (): AddCategoryPlace => {
  const repository = new CategoryPlaceRepository(makeDatabaseInstance(whiteLabel.database,"categoryPlace"));
  return addCategoryPlace(repository);
};
