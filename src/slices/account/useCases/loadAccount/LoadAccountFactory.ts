import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AccountRepository } from "@/slices/account/repositories";
import { loadAccount, LoadAccount } from "@/slices/account/useCases";

export const makeLoadAccountFactory = (): LoadAccount => {
  const repository = new AccountRepository(
    makeDatabaseInstance(whiteLabel.database, "account")
  );
  return loadAccount(repository);
};
