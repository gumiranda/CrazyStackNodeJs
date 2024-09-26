import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { ClientRepository } from "@/slices/client/repositories";
import { addClient, AddClient } from "@/slices/client/useCases";

export const makeAddClientFactory = (): AddClient => {
  const repository = new ClientRepository(
    makeDatabaseInstance(whiteLabel.database, "client")
  );
  return addClient(repository);
};
