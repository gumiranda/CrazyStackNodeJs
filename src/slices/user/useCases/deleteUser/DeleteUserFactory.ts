import { makeDatabaseInstance } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { deleteUser, DeleteUser } from "@/slices/user/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteUserFactory = (): DeleteUser => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return deleteUser(repository);
};
