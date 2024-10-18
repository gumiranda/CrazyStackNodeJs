import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { FollowRepository } from "@/slices/follow/repositories";
import { updateFollow, UpdateFollow } from "@/slices/follow/useCases";

export const makeUpdateFollowFactory = (): UpdateFollow => {
  const repository = new FollowRepository(makeDatabaseInstance(whiteLabel.database,"follow"));
  return updateFollow(repository);
};
