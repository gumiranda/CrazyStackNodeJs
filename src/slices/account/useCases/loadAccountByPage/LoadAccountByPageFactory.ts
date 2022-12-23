import { MongoRepository } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { loadAccountByPage, LoadAccountByPage } from "@/slices/account/useCases";

export const makeLoadAccountByPageFactory = (): LoadAccountByPage => {
  const repository = new AccountRepository(new MongoRepository("account"));
  return loadAccountByPage(repository);
};
