import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AccountRepository } from "@/slices/account/repositories";
import { addAccount, AddAccount } from "@/slices/account/useCases";

export const makeAddAccountFactory = (): AddAccount => {
  const repository = new AccountRepository(
    makeDatabaseInstance(whiteLabel.database, "account")
  );
  return addAccount(repository);
};
