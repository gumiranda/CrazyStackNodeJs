import { makeDatabaseInstance } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { updateOwner, UpdateOwner } from "@/slices/owner/useCases";

export const makeUpdateOwnerFactory = (): UpdateOwner => {
  const repository = new OwnerRepository(makeDatabaseInstance("mongodb", "owner"));
  return updateOwner(repository);
};
