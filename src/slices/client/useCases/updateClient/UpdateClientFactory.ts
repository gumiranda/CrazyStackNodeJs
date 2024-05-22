import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { ClientRepository } from "@/slices/client/repositories";
import { updateClient, UpdateClient } from "@/slices/client/useCases";

export const makeUpdateClientFactory = (): UpdateClient => {
  const repository = new ClientRepository(
    makeDatabaseInstance(whiteLabel.database, "client")
  );
  return updateClient(repository);
};
