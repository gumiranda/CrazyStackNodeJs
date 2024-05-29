import { makeDatabaseInstance } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { updateService, UpdateService } from "@/slices/service/useCases";

export const makeUpdateServiceFactory = (): UpdateService => {
  const repository = new ServiceRepository(makeDatabaseInstance("mongodb", "service"));
  return updateService(repository);
};
