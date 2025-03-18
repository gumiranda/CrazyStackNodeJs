import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { FollowRepository } from "@/slices/social-network/follow/repositories";
import { addFollow, AddFollow } from "@/slices/social-network/follow/useCases";

export const makeAddFollowFactory = (): AddFollow => {
  const repository = new FollowRepository(
    makeDatabaseInstance(whiteLabel.database, "follow")
  );
  return addFollow(repository);
};
