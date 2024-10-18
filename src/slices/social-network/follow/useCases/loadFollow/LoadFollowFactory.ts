import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { FollowRepository } from "@/slices/follow/repositories";
import { loadFollow, LoadFollow } from "@/slices/follow/useCases";

export const makeLoadFollowFactory = (): LoadFollow => {
  const repository = new FollowRepository(makeDatabaseInstance(whiteLabel.database,"follow"));
  return loadFollow(repository);
};
