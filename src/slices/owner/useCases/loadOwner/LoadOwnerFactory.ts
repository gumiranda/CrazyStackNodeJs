import { makeDatabaseInstance } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { loadOwner, LoadOwner } from "@/slices/owner/useCases";

export const makeLoadOwnerFactory = (): LoadOwner => {
  const repository = new OwnerRepository(makeDatabaseInstance("mongodb", "owner"));
  return loadOwner(repository);
};
