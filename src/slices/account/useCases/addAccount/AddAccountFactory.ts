import { makeDatabaseInstance } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { addAccount, AddAccount } from "@/slices/account/useCases";

export const makeAddAccountFactory = (): AddAccount => {
  const repository = new AccountRepository(makeDatabaseInstance("mongodb", "account"));
  return addAccount(repository);
};
