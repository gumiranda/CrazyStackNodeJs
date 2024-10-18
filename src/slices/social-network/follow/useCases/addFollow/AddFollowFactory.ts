import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { FollowRepository } from "@/slices/follow/repositories";
import { addFollow, AddFollow } from "@/slices/follow/useCases";

export const makeAddFollowFactory = (): AddFollow => {
  const repository = new FollowRepository(makeDatabaseInstance(whiteLabel.database,"follow"));
  return addFollow(repository);
};
