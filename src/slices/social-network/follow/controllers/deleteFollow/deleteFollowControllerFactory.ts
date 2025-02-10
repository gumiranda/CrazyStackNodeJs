import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteFollowFactory } from "@/slices/social-network/follow/useCases";
import { DeleteFollowController } from "@/slices/social-network/follow/controllers";

export const makeDeleteFollowController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteFollow",
    new DeleteFollowController(
      makeValidationComposite(requiredFields),
      makeDeleteFollowFactory()
    )
  );
};
