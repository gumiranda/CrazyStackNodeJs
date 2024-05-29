import { makeDatabaseInstance } from "@/application/infra";
import { ClientRepository } from "@/slices/client/repositories";
import { updateClient, UpdateClient } from "@/slices/client/useCases";

export const makeUpdateClientFactory = (): UpdateClient => {
  const repository = new ClientRepository(makeDatabaseInstance("mongodb", "client"));
  return updateClient(repository);
};
