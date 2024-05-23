import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { RequestRepository } from "@/slices/request/repositories";
import { addRequest, AddRequest } from "@/slices/request/useCases";

export const makeAddRequestFactory = (): AddRequest => {
  const repository = new RequestRepository(
    makeDatabaseInstance(whiteLabel.database, "request")
  );
  return addRequest(repository);
};
