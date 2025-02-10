import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadFollowByPageFactory } from "@/slices/social-network/follow/useCases";
import { LoadFollowByPageController } from "@/slices/social-network/follow/controllers";

export const makeLoadFollowByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadFollowByPage",
    new LoadFollowByPageController(
      makeValidationComposite(requiredFields),
      makeLoadFollowByPageFactory()
    )
  );
};
