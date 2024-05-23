import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { RequestRepository } from "@/slices/request/repositories";
import { loadRequestByPage, LoadRequestByPage } from "@/slices/request/useCases";

export const makeLoadRequestByPageFactory = (): LoadRequestByPage => {
  const repository = new RequestRepository(
    makeDatabaseInstance(whiteLabel.database, "owner")
  );
  return loadRequestByPage(repository);
};
