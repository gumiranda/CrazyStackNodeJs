import { makeDatabaseInstance } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { loadUserDetailed } from "@/slices/user/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeLoadPhotoFactory } from "@/slices/photo/useCases";

export const makeLoadUserDetailedFactory = () => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return loadUserDetailed(
    repository,
    makeLoadPhotoFactory()
  );
};
