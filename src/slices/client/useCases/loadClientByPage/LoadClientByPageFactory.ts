import { makeDatabaseInstance } from "@/application/infra";
import { ClientRepository } from "@/slices/client/repositories";
import { loadClientByPage, LoadClientByPage } from "@/slices/client/useCases";

export const makeLoadClientByPageFactory = (): LoadClientByPage => {
  const repository = new ClientRepository(makeDatabaseInstance("mongodb", "client"));
  return loadClientByPage(repository);
};
