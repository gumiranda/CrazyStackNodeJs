import { MongoRepository } from "@/application/infra";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";
import { UserRepository } from "@/slices/user/repositories";
import { loadUserByPageGeoNear, LoadUserByPageGeoNear } from "@/slices/user/useCases";

export const makeLoadUserByPageGeoNearFactory = (): LoadUserByPageGeoNear => {
  const repository = new UserRepository(new PostgresRepository("user"));
  return loadUserByPageGeoNear(repository);
};
