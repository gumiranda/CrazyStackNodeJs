import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { OwnerRepository } from "@/slices/owner/repositories";
import { updateOwner, UpdateOwner } from "@/slices/owner/useCases";

export const makeUpdateOwnerFactory = (): UpdateOwner => {
  const repository = new OwnerRepository(
    makeDatabaseInstance(whiteLabel.database, "owner")
  );
  return updateOwner(repository);
};
