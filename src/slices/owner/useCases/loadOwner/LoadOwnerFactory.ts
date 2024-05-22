import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { OwnerRepository } from "@/slices/owner/repositories";
import { loadOwner, LoadOwner } from "@/slices/owner/useCases";

export const makeLoadOwnerFactory = (): LoadOwner => {
  const repository = new OwnerRepository(
    makeDatabaseInstance(whiteLabel.database, "owner")
  );
  return loadOwner(repository);
};
