import { makeDatabaseInstance } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { loadUser, LoadUser } from "@/slices/user/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeLoadPhotoFactory } from "@/slices/photo/useCases";

export const makeLoadUserFactory = (): LoadUser => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  return loadUser(repository, makeLoadPhotoFactory());
};
