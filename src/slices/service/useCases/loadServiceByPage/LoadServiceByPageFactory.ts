import { makeDatabaseInstance } from "@/application/infra";
import { ServiceRepository } from "@/slices/service/repositories";
import { loadServiceByPage, LoadServiceByPage } from "@/slices/service/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadServiceByPageFactory = (): LoadServiceByPage => {
  const repository = new ServiceRepository(
    makeDatabaseInstance(whiteLabel.database, "service")
  );
  return loadServiceByPage(repository);
};
