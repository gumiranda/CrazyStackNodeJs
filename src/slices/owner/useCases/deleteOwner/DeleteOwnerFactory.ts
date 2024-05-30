import { makeDatabaseInstance } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { deleteOwner, DeleteOwner } from "@/slices/owner/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteOwnerFactory = (): DeleteOwner => {
  const repository = new OwnerRepository(
    makeDatabaseInstance(whiteLabel.database, "owner")
  );
  return deleteOwner(repository);
};
