import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { RequestRepository } from "@/slices/request/repositories";
import { deleteRequest, DeleteRequest } from "@/slices/request/useCases";

export const makeDeleteRequestFactory = (): DeleteRequest => {
  const repository = new RequestRepository(
    makeDatabaseInstance(whiteLabel.database, "request")
  );
  return deleteRequest(repository);
};
