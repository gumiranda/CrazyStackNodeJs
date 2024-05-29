import { makeDatabaseInstance } from "@/application/infra";
import { ClientRepository } from "@/slices/client/repositories";
import { deleteClient, DeleteClient } from "@/slices/client/useCases";

export const makeDeleteClientFactory = (): DeleteClient => {
  const repository = new ClientRepository(makeDatabaseInstance("mongodb", "client"));
  return deleteClient(repository);
};
