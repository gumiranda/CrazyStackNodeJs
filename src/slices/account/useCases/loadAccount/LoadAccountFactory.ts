import { MongoRepository } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { loadAccount, LoadAccount } from "@/slices/account/useCases";

export const makeLoadAccountFactory = (): LoadAccount => {
  const repository = new AccountRepository(new MongoRepository("account"));
  return loadAccount(repository);
};
