import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadFollowFactory } from "@/slices/follow/useCases";
import { LoadFollowController } from "@/slices/follow/controllers";

export const makeLoadFollowController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadFollow",
    new LoadFollowController(
      makeValidationComposite(requiredFields),
      makeLoadFollowFactory()
    )
  );
};
