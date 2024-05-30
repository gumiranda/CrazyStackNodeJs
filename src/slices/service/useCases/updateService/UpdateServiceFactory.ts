import { makeDatabaseInstance } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { updateService, UpdateService } from "@/slices/service/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateServiceFactory = (): UpdateService => {
  const repository = new ServiceRepository(
    makeDatabaseInstance(whiteLabel.database, "service")
  );
  return updateService(repository);
};
