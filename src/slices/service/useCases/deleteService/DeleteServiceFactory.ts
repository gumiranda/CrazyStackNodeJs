import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { ServiceRepository } from "@/slices/service/repositories";
import { deleteService, DeleteService } from "@/slices/service/useCases";

export const makeDeleteServiceFactory = (): DeleteService => {
  const repository = new ServiceRepository(
    makeDatabaseInstance(whiteLabel.database, "service")
  );
  return deleteService(repository);
};
