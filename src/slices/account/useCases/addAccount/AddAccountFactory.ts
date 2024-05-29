import { makeDatabaseInstance } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { addAccount, AddAccount } from "@/slices/account/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddAccountFactory = (): AddAccount => {
  const repository = new AccountRepository(
    makeDatabaseInstance(whiteLabel.database, "account")
  );
  return addAccount(repository);
};
