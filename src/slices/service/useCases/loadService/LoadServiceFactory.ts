import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { ServiceRepository } from "@/slices/service/repositories";
import { loadService, LoadService } from "@/slices/service/useCases";

export const makeLoadServiceFactory = (): LoadService => {
  const repository = new ServiceRepository(
    makeDatabaseInstance(whiteLabel.database, "service")
  );
  return loadService(repository);
};
