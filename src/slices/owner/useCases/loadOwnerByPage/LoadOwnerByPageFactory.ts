import { makeDatabaseInstance } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { loadOwnerByPage, LoadOwnerByPage } from "@/slices/owner/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeLoadPlaceFactory } from "@/slices/place/useCases";

export const makeLoadOwnerByPageFactory = (): LoadOwnerByPage => {
  const repository = new OwnerRepository(
    makeDatabaseInstance(whiteLabel.database, "owner")
  );
  return loadOwnerByPage(repository, makeLoadPlaceFactory());
};
