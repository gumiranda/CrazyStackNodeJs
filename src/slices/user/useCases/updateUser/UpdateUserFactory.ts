import { MongoRepository } from "@/application/infra";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";
import { UserRepository } from "@/slices/user/repositories";
import { updateUser, UpdateUser } from "@/slices/user/useCases";

export const makeUpdateUserFactory = (): UpdateUser => {
  const repository = new UserRepository(new PostgresRepository("users"));
  return updateUser(repository);
};
