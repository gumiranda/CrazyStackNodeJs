import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { FollowRepository } from "@/slices/follow/repositories";
import { loadFollowByPage, LoadFollowByPage } from "@/slices/follow/useCases";

export const makeLoadFollowByPageFactory = (): LoadFollowByPage => {
  const repository = new FollowRepository(makeDatabaseInstance(whiteLabel.database,"follow"));
  return loadFollowByPage(repository);
};
