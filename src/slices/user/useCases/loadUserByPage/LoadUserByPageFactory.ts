import { MongoRepository } from "@/application/infra";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";
import { UserRepository } from "@/slices/user/repositories";
import { loadUserByPage, LoadUserByPage } from "@/slices/user/useCases";

export const makeLoadUserByPageFactory = (): LoadUserByPage => {
  const repository = new UserRepository(new PostgresRepository("users"));
  return loadUserByPage(repository);
};
