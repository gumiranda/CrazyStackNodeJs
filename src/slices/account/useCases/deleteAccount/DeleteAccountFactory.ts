import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AccountRepository } from "@/slices/account/repositories";
import { deleteAccount, DeleteAccount } from "@/slices/account/useCases";

export const makeDeleteAccountFactory = (): DeleteAccount => {
  const repository = new AccountRepository(
    makeDatabaseInstance(whiteLabel.database, "account")
  );
  return deleteAccount(repository);
};
