import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { CategoryPlaceRepository } from "@/slices/categoryPlace/repositories";
import { loadCategoryPlaceByPage, LoadCategoryPlaceByPage } from "@/slices/categoryPlace/useCases";

export const makeLoadCategoryPlaceByPageFactory = (): LoadCategoryPlaceByPage => {
  const repository = new CategoryPlaceRepository(makeDatabaseInstance(whiteLabel.database,"categoryPlace"));
  return loadCategoryPlaceByPage(repository);
};
