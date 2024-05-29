import { makeDatabaseInstance } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { deleteRequest, DeleteRequest } from "@/slices/request/useCases";

export const makeDeleteRequestFactory = (): DeleteRequest => {
  const repository = new RequestRepository(makeDatabaseInstance("mongodb", "request"));
  return deleteRequest(repository);
};
