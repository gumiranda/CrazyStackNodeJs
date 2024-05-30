import { makeDatabaseInstance } from "@/application/infra";
import { ClientRepository } from "@/slices/client/repositories";
import { loadClient, LoadClient } from "@/slices/client/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadClientFactory = (): LoadClient => {
  const repository = new ClientRepository(
    makeDatabaseInstance(whiteLabel.database, "client")
  );
  return loadClient(repository);
};
