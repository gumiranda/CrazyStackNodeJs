import { makeDatabaseInstance } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { loadRequestByPage, LoadRequestByPage } from "@/slices/request/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadRequestByPageFactory = (): LoadRequestByPage => {
  const repository = new RequestRepository(
    makeDatabaseInstance(whiteLabel.database, "request")
  );
  return loadRequestByPage(repository);
};
