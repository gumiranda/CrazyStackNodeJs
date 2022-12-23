import { MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { addUser, AddUser } from "@/slices/user/useCases";

export const makeAddUserFactory = (): AddUser => {
  const repository = new UserRepository(new MongoRepository("user"));
  return addUser(repository);
};
