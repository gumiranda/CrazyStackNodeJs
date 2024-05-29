import { makeDatabaseInstance } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { loadAccount, LoadAccount } from "@/slices/account/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadAccountFactory = (): LoadAccount => {
  const repository = new AccountRepository(
    makeDatabaseInstance(whiteLabel.database, "account")
  );
  return loadAccount(repository);
};
