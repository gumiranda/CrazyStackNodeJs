import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { RequestRepository } from "@/slices/request/repositories";
import { updateRequest, UpdateRequest } from "@/slices/request/useCases";

export const makeUpdateRequestFactory = (): UpdateRequest => {
  const repository = new RequestRepository(
    makeDatabaseInstance(whiteLabel.database, "owner")
  );
  return updateRequest(repository);
};
