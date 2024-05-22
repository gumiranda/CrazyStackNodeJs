import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { UserRepository } from "@/slices/user/repositories";
import { deleteUser, DeleteUser } from "@/slices/user/useCases";

export const makeDeleteUserFactory = (): DeleteUser => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return deleteUser(repository);
};
