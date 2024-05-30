import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { OwnerRepository } from "@/slices/owner/repositories";
import { addOwner, AddOwner } from "@/slices/owner/useCases";

export const makeAddOwnerFactory = (): AddOwner => {
  const repository = new OwnerRepository(
    makeDatabaseInstance(whiteLabel.database, "owner")
  );
  return addOwner(repository);
};
