import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteFollowFactory } from "@/slices/follow/useCases";
import { DeleteFollowController } from "@/slices/follow/controllers";

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
