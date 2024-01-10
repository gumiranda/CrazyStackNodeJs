import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadAverageRatingResultFactory } from "@/slices/ratingResult/useCases";
import { LoadAverageRatingResultController } from "@/slices/ratingResult/controllers";

export const makeLoadAverageRatingResultController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadAverageRatingResult",
    new LoadAverageRatingResultController(
      makeValidationComposite(requiredFields),
      makeLoadAverageRatingResultFactory()
    )
  );
};
