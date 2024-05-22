import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { ServiceRepository } from "@/slices/service/repositories";
import { updateService, UpdateService } from "@/slices/service/useCases";

export const makeUpdateServiceFactory = (): UpdateService => {
  const repository = new ServiceRepository(
    makeDatabaseInstance(whiteLabel.database, "service")
  );
  return updateService(repository);
};
