import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { UserRepository } from "@/slices/user/repositories";
import { updateUser, UpdateUser } from "@/slices/user/useCases";

export const makeUpdateUserFactory = (): UpdateUser => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return updateUser(repository);
};
