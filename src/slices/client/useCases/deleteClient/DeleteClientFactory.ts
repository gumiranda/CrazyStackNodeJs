import { makeDatabaseInstance } from "@/application/infra";
import { ClientRepository } from "@/slices/client/repositories";
import { deleteClient, DeleteClient } from "@/slices/client/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteClientFactory = (): DeleteClient => {
  const repository = new ClientRepository(
    makeDatabaseInstance(whiteLabel.database, "client")
  );
  return deleteClient(repository);
};
