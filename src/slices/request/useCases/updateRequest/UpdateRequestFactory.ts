import { makeDatabaseInstance } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { updateRequest, UpdateRequest } from "@/slices/request/useCases";

export const makeUpdateRequestFactory = (): UpdateRequest => {
  const repository = new RequestRepository(makeDatabaseInstance("mongodb", "request"));
  return updateRequest(repository);
};
