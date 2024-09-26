import { makeDatabaseInstance } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { addRequest, AddRequest } from "@/slices/request/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddRequestFactory = (): AddRequest => {
  const repository = new RequestRepository(
    makeDatabaseInstance(whiteLabel.database, "request")
  );
  return addRequest(repository);
};
