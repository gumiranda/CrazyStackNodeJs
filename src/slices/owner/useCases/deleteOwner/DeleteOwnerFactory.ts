import { makeDatabaseInstance } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { deleteOwner, DeleteOwner } from "@/slices/owner/useCases";

export const makeDeleteOwnerFactory = (): DeleteOwner => {
  const repository = new OwnerRepository(makeDatabaseInstance("mongodb", "owner"));
  return deleteOwner(repository);
};
