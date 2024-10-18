import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { FollowRepository } from "@/slices/follow/repositories";
import { deleteFollow, DeleteFollow } from "@/slices/follow/useCases";

export const makeDeleteFollowFactory = (): DeleteFollow => {
  const repository = new FollowRepository(makeDatabaseInstance(whiteLabel.database,"follow"));
  return deleteFollow(repository);
};
