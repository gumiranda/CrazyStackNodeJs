import { MongoRepository } from "@/application/infra";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";
import { UserRepository } from "@/slices/user/repositories";
import { deleteUser, DeleteUser } from "@/slices/user/useCases";

export const makeDeleteUserFactory = (): DeleteUser => {
  const repository = new UserRepository(new PostgresRepository("users"));
  return deleteUser(repository);
};
