import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadRatingResultFactory } from "@/slices/ratingResult/useCases";
import { LoadRatingResultController } from "@/slices/ratingResult/controllers";

export const makeLoadRatingResultController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadRatingResult",
    new LoadRatingResultController(
      makeValidationComposite(requiredFields),
      makeLoadRatingResultFactory()
    )
  );
};
