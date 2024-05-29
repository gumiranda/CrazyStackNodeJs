import { makeDatabaseInstance } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { updateAccount, UpdateAccount } from "@/slices/account/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateAccountFactory = (): UpdateAccount => {
  const repository = new AccountRepository(
    makeDatabaseInstance(whiteLabel.database, "account")
  );
  return updateAccount(repository);
};
