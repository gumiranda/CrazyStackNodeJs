import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { ClientRepository } from "@/slices/client/repositories";
import { loadClientByPage, LoadClientByPage } from "@/slices/client/useCases";

export const makeLoadClientByPageFactory = (): LoadClientByPage => {
  const repository = new ClientRepository(
    makeDatabaseInstance(whiteLabel.database, "client")
  );
  return loadClientByPage(repository);
};
