import { makeDatabaseInstance } from "@/application/infra";
import { ClientRepository } from "@/slices/client/repositories";
import { updateClient, UpdateClient } from "@/slices/client/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateClientFactory = (): UpdateClient => {
  const repository = new ClientRepository(
    makeDatabaseInstance(whiteLabel.database, "client")
  );
  return updateClient(repository);
};
