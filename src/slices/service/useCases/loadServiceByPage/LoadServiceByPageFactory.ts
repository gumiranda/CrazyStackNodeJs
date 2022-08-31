import { MongoRepository } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { loadServiceByPage, LoadServiceByPage } from "@/slices/service/useCases";

export const makeLoadServiceByPageFactory = (): LoadServiceByPage => {
  const repository = new ServiceRepository(new MongoRepository("service"));
  return loadServiceByPage(repository);
};
