import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { UserRepository } from "@/slices/user/repositories";
import { loadUserByPage, LoadUserByPage } from "@/slices/user/useCases";

export const makeLoadUserByPageFactory = (): LoadUserByPage => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return loadUserByPage(repository);
};
