import { BcryptAdapter } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { addUser, AddUser } from "@/slices/user/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
export const makeAddUserFactory = (): AddUser => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return addUser(repository, bcryptAdapter);
};
