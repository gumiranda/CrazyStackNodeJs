import { makeDatabaseInstance } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { loadUser, LoadUser } from "@/slices/user/useCases";

export const makeLoadUserFactory = (): LoadUser => {
  const repository = new UserRepository(makeDatabaseInstance("mongodb", "users"));
  return loadUser(repository);
};
