import { MongoRepository } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { addRequest, AddRequest } from "@/slices/request/useCases";

export const makeAddRequestFactory = (): AddRequest => {
  const repository = new RequestRepository(new MongoRepository("request"));
  return addRequest(repository);
};
