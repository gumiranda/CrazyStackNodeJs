import { makeDatabaseInstance } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { loadService, LoadService } from "@/slices/service/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadServiceFactory = (): LoadService => {
  const repository = new ServiceRepository(
    makeDatabaseInstance(whiteLabel.database, "service")
  );
  return loadService(repository);
};
