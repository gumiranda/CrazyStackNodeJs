import { MongoRepository } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { deleteRequest, DeleteRequest } from "@/slices/request/useCases";

export const makeDeleteRequestFactory = (): DeleteRequest => {
  const repository = new RequestRepository(new MongoRepository("request"));
  return deleteRequest(repository);
};
