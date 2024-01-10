import { MongoRepository } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { loadRequest, LoadRequest } from "@/slices/request/useCases";

export const makeLoadRequestFactory = (): LoadRequest => {
  const repository = new RequestRepository(new MongoRepository("request"));
  return loadRequest(repository);
};
