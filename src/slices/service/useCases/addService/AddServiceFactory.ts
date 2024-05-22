import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { ServiceRepository } from "@/slices/service/repositories";
import { addService, AddService } from "@/slices/service/useCases";

export const makeAddServiceFactory = (): AddService => {
  const repository = new ServiceRepository(
    makeDatabaseInstance(whiteLabel.database, "service")
  );
  return addService(repository);
};
