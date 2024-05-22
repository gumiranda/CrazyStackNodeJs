import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { UserRepository } from "@/slices/user/repositories";
import { loadUser, LoadUser } from "@/slices/user/useCases";

export const makeLoadUserFactory = (): LoadUser => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return loadUser(repository);
};
