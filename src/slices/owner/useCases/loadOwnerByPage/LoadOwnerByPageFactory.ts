import { MongoRepository } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { loadOwnerByPage, LoadOwnerByPage } from "@/slices/owner/useCases";

export const makeLoadOwnerByPageFactory = (): LoadOwnerByPage => {
  const repository = new OwnerRepository(new MongoRepository("owner"));
  return loadOwnerByPage(repository);
};
