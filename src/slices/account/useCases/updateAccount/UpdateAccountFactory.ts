import { makeDatabaseInstance } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { updateAccount, UpdateAccount } from "@/slices/account/useCases";

export const makeUpdateAccountFactory = (): UpdateAccount => {
  const repository = new AccountRepository(makeDatabaseInstance("mongodb", "account"));
  return updateAccount(repository);
};
