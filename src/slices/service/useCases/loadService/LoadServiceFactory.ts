import { makeDatabaseInstance } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { loadService, LoadService } from "@/slices/service/useCases";

export const makeLoadServiceFactory = (): LoadService => {
  const repository = new ServiceRepository(makeDatabaseInstance("mongodb", "service"));
  return loadService(repository);
};
