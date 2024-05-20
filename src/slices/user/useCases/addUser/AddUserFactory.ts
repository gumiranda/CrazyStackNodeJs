import { BcryptAdapter, MongoRepository } from "@/application/infra";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";
import { UserRepository } from "@/slices/user/repositories";
import { addUser, AddUser } from "@/slices/user/useCases";

export const makeAddUserFactory = (): AddUser => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const repository = new UserRepository(new PostgresRepository("users"));
  return addUser(repository, bcryptAdapter);
};
