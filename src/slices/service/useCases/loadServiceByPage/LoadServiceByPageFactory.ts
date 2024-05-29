import { makeDatabaseInstance } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { loadServiceByPage, LoadServiceByPage } from "@/slices/service/useCases";

export const makeLoadServiceByPageFactory = (): LoadServiceByPage => {
  const repository = new ServiceRepository(makeDatabaseInstance("mongodb", "service"));
  return loadServiceByPage(repository);
};
