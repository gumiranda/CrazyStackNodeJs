import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadRatingByPageFactory } from "@/slices/rating/useCases";
import { LoadRatingByPageController } from "@/slices/rating/controllers";

export const makeLoadRatingByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadRatingByPage",
    new LoadRatingByPageController(
      makeValidationComposite(requiredFields),
      makeLoadRatingByPageFactory()
    )
  );
};
