import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { RequestRepository } from "@/slices/request/repositories";
import { loadRequest, LoadRequest } from "@/slices/request/useCases";

export const makeLoadRequestFactory = (): LoadRequest => {
  const repository = new RequestRepository(
    makeDatabaseInstance(whiteLabel.database, "request")
  );
  return loadRequest(repository);
};
