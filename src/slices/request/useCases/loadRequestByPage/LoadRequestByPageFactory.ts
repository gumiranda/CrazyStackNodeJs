import { makeDatabaseInstance } from "@/application/infra";
import { RequestRepository } from "@/slices/request/repositories";
import { loadRequestByPage, LoadRequestByPage } from "@/slices/request/useCases";

export const makeLoadRequestByPageFactory = (): LoadRequestByPage => {
  const repository = new RequestRepository(makeDatabaseInstance("mongodb", "request"));
  return loadRequestByPage(repository);
};
