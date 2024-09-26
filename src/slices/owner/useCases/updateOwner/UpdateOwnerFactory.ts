import { makeDatabaseInstance } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { updateOwner, UpdateOwner } from "@/slices/owner/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateOwnerFactory = (): UpdateOwner => {
  const repository = new OwnerRepository(
    makeDatabaseInstance(whiteLabel.database, "owner")
  );
  return updateOwner(repository);
};
