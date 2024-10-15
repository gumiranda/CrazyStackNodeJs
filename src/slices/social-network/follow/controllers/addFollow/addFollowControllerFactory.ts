import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddFollowFactory } from "@/slices/social-network/follow/useCases";
import { AddFollowController } from "@/slices/social-network/follow/controllers";

export const makeAddFollowController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addFollow",
    new AddFollowController(
      makeValidationComposite(requiredFields),
      makeAddFollowFactory()
    )
  );
};
