import { makeDatabaseInstance } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { addService, AddService } from "@/slices/service/useCases";

export const makeAddServiceFactory = (): AddService => {
  const repository = new ServiceRepository(makeDatabaseInstance("mongodb", "service"));
  return addService(repository);
};
