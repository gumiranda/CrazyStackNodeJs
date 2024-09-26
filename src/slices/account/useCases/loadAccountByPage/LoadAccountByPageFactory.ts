import { makeDatabaseInstance } from "@/application/infra";
import { AccountRepository } from "@/slices/account/repositories";
import { loadAccountByPage, LoadAccountByPage } from "@/slices/account/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadAccountByPageFactory = (): LoadAccountByPage => {
  const repository = new AccountRepository(
    makeDatabaseInstance(whiteLabel.database, "account")
  );
  return loadAccountByPage(repository);
};
