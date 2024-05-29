import { makeDatabaseInstance } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { loadUserByPageGeoNear, LoadUserByPageGeoNear } from "@/slices/user/useCases";

export const makeLoadUserByPageGeoNearFactory = (): LoadUserByPageGeoNear => {
  const repository = new UserRepository(makeDatabaseInstance("mongodb", "users"));
  return loadUserByPageGeoNear(repository);
};
