import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { ServiceRepository } from "@/slices/service/repositories";
import { loadServiceByPage, LoadServiceByPage } from "@/slices/service/useCases";

export const makeLoadServiceByPageFactory = (): LoadServiceByPage => {
  const repository = new ServiceRepository(
    makeDatabaseInstance(whiteLabel.database, "service")
  );
  return loadServiceByPage(repository);
};
