import { makeDatabaseInstance } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { loadUserByPageGeoNear, LoadUserByPageGeoNear } from "@/slices/user/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadUserByPageGeoNearFactory = (): LoadUserByPageGeoNear => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return loadUserByPageGeoNear(repository);
};
