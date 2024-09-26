import { makeDatabaseInstance } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { loadOwner, LoadOwner } from "@/slices/owner/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadOwnerFactory = (): LoadOwner => {
  const repository = new OwnerRepository(
    makeDatabaseInstance(whiteLabel.database, "owner")
  );
  return loadOwner(repository);
};
