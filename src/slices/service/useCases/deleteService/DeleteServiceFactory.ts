import { makeDatabaseInstance } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { deleteService, DeleteService } from "@/slices/service/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteServiceFactory = (): DeleteService => {
  const repository = new ServiceRepository(
    makeDatabaseInstance(whiteLabel.database, "service")
  );
  return deleteService(repository);
};
