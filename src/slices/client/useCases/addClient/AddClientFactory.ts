import { MongoRepository } from "@/application/infra";
import { ClientRepository } from "@/slices/client/repositories";
import { addClient, AddClient } from "@/slices/client/useCases";

export const makeAddClientFactory = (): AddClient => {
  const repository = new ClientRepository(new MongoRepository("client"));
  return addClient(repository);
};
