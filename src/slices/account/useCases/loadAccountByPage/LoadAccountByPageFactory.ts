import { makeDatabaseInstance } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { loadAccountByPage, LoadAccountByPage } from "@/slices/account/useCases";

export const makeLoadAccountByPageFactory = (): LoadAccountByPage => {
  const repository = new AccountRepository(makeDatabaseInstance("mongodb", "account"));
  return loadAccountByPage(repository);
};
