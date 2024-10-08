import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { RequestRepository } from "@/slices/request/repositories";
import { updateRequest, UpdateRequest } from "@/slices/request/useCases";

export const makeUpdateRequestFactory = (): UpdateRequest => {
  const repository = new RequestRepository(
    makeDatabaseInstance(whiteLabel.database, "request")
  );
  return updateRequest(repository);
};
