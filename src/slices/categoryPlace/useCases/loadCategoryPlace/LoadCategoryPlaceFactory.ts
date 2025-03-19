import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { CategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import { loadCategoryPlace, LoadCategoryPlace } from "@/slices/categoryPlace/useCases";

export const makeLoadCategoryPlaceFactory = (): LoadCategoryPlace => {
  const repository = new CategoryPlaceRepository(makeDatabaseInstance(whiteLabel.database,"categoryPlace"));
  return loadCategoryPlace(repository);
};
