import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";
import { UserRepository } from "@/slices/user/repositories";
import { loadUserByPageGeoNear, LoadUserByPageGeoNear } from "@/slices/user/useCases";

export const makeLoadUserByPageGeoNearFactory = (): LoadUserByPageGeoNear => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return loadUserByPageGeoNear(repository);
};
