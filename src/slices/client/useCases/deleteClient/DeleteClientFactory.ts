import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { ClientRepository } from "@/slices/client/repositories";
import { deleteClient, DeleteClient } from "@/slices/client/useCases";

export const makeDeleteClientFactory = (): DeleteClient => {
  const repository = new ClientRepository(
    makeDatabaseInstance(whiteLabel.database, "client")
  );
  return deleteClient(repository);
};
