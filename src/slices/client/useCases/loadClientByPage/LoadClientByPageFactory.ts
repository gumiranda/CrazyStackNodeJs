import { makeDatabaseInstance } from "@/application/infra";
import { ClientRepository } from "@/slices/client/repositories";
import { loadClientByPage, LoadClientByPage } from "@/slices/client/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadClientByPageFactory = (): LoadClientByPage => {
  const repository = new ClientRepository(
    makeDatabaseInstance(whiteLabel.database, "client")
  );
  return loadClientByPage(repository);
};
