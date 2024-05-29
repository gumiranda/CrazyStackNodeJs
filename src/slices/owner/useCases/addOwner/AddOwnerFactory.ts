import { makeDatabaseInstance } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { addOwner, AddOwner } from "@/slices/owner/useCases";

export const makeAddOwnerFactory = (): AddOwner => {
  const repository = new OwnerRepository(makeDatabaseInstance("mongodb", "owner"));
  return addOwner(repository);
};
