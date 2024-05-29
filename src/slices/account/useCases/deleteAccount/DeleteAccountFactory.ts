import { makeDatabaseInstance } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { deleteAccount, DeleteAccount } from "@/slices/account/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteAccountFactory = (): DeleteAccount => {
  const repository = new AccountRepository(
    makeDatabaseInstance(whiteLabel.database, "account")
  );
  return deleteAccount(repository);
};
