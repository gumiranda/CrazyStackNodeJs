import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { AccountRepository } from "@/slices/account/repositories";
import { loadAccountByPage, LoadAccountByPage } from "@/slices/account/useCases";

export const makeLoadAccountByPageFactory = (): LoadAccountByPage => {
  const repository = new AccountRepository(
    makeDatabaseInstance(whiteLabel.database, "account")
  );
  return loadAccountByPage(repository);
};
