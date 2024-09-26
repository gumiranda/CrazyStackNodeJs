import { makeDatabaseInstance } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { loadUserByPage, LoadUserByPage } from "@/slices/user/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadUserByPageFactory = (): LoadUserByPage => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return loadUserByPage(repository);
};
