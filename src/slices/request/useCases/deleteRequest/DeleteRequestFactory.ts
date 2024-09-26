import { makeDatabaseInstance } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { deleteRequest, DeleteRequest } from "@/slices/request/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteRequestFactory = (): DeleteRequest => {
  const repository = new RequestRepository(
    makeDatabaseInstance(whiteLabel.database, "request")
  );
  return deleteRequest(repository);
};
