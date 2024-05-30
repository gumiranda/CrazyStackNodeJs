import { makeDatabaseInstance } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { loadRequest, LoadRequest } from "@/slices/request/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadRequestFactory = (): LoadRequest => {
  const repository = new RequestRepository(
    makeDatabaseInstance(whiteLabel.database, "request")
  );
  return loadRequest(repository);
};
