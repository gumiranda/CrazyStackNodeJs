import { makeDatabaseInstance } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { updateUser, UpdateUser } from "@/slices/user/useCases";

export const makeUpdateUserFactory = (): UpdateUser => {
  const repository = new UserRepository(makeDatabaseInstance("mongodb", "users"));
  return updateUser(repository);
};
