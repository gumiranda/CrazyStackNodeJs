import { MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { loadUserByPage, LoadUserByPage } from "@/slices/user/useCases";

export const makeLoadUserByPageFactory = (): LoadUserByPage => {
  const repository = new UserRepository(new MongoRepository("user"));
  return loadUserByPage(repository);
};
