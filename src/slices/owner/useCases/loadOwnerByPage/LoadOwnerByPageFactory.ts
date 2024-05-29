import { makeDatabaseInstance } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { loadOwnerByPage, LoadOwnerByPage } from "@/slices/owner/useCases";

export const makeLoadOwnerByPageFactory = (): LoadOwnerByPage => {
  const repository = new OwnerRepository(makeDatabaseInstance("mongodb", "owner"));
  return loadOwnerByPage(repository);
};
