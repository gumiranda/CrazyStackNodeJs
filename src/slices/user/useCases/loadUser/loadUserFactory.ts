import { MongoRepository } from "@/application/infra";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";
import { UserRepository } from "@/slices/user/repositories";
import { loadUser, LoadUser } from "@/slices/user/useCases";

export const makeLoadUserFactory = (): LoadUser => {
  const repository = new UserRepository(new PostgresRepository("users"));
  return loadUser(repository);
};
