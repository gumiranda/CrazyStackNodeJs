import { MongoRepository } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { updateService, UpdateService } from "@/slices/service/useCases";

export const makeUpdateServiceFactory = (): UpdateService => {
  const repository = new ServiceRepository(new MongoRepository("service"));
  return updateService(repository);
};
