import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { ClientRepository } from "@/slices/client/repositories";
import { loadClient, LoadClient } from "@/slices/client/useCases";

export const makeLoadClientFactory = (): LoadClient => {
  const repository = new ClientRepository(
    makeDatabaseInstance(whiteLabel.database, "client")
  );
  return loadClient(repository);
};
