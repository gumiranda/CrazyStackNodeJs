import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import {
  makeAddFollowFactory,
  makeDeleteFollowFactory,
  makeLoadFollowFactory,
} from "@/slices/social-network/follow/useCases";
import { AddFollowController } from "@/slices/social-network/follow/controllers";

export const makeAddFollowController = (): Controller => {
  const requiredFields = ["user1Slug", "user2Slug"];
  return makeLogController(
    "addFollow",
    new AddFollowController(
      makeValidationComposite(requiredFields),
      makeAddFollowFactory(),
      makeLoadFollowFactory(),
      makeDeleteFollowFactory()
    )
  );
};
