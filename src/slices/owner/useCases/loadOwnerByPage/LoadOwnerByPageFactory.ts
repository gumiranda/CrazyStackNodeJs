import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { OwnerRepository } from "@/slices/owner/repositories";
import { loadOwnerByPage, LoadOwnerByPage } from "@/slices/owner/useCases";

export const makeLoadOwnerByPageFactory = (): LoadOwnerByPage => {
  const repository = new OwnerRepository(
    makeDatabaseInstance(whiteLabel.database, "owner")
  );
  return loadOwnerByPage(repository);
};
