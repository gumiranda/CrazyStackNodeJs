import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadRatingResultByPageFactory } from "@/slices/ratingResult/useCases";
import { LoadRatingResultByPageController } from "@/slices/ratingResult/controllers";

export const makeLoadRatingResultByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadRatingResultByPage",
    new LoadRatingResultByPageController(
      makeValidationComposite(requiredFields),
      makeLoadRatingResultByPageFactory()
    )
  );
};
