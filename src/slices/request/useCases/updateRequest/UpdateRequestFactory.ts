import { MongoRepository } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { updateRequest, UpdateRequest } from "@/slices/request/useCases";

export const makeUpdateRequestFactory = (): UpdateRequest => {
  const repository = new RequestRepository(new MongoRepository("request"));
  return updateRequest(repository);
};
