import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AccountRepository } from "@/slices/account/repositories";
import { updateAccount, UpdateAccount } from "@/slices/account/useCases";

export const makeUpdateAccountFactory = (): UpdateAccount => {
  const repository = new AccountRepository(
    makeDatabaseInstance(whiteLabel.database, "account")
  );
  return updateAccount(repository);
};
