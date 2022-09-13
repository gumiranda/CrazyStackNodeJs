import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteRatingFactory } from "@/slices/rating/useCases";
import { DeleteRatingController } from "@/slices/rating/controllers";

export const makeDeleteRatingController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteRating",
    new DeleteRatingController(
      makeValidationComposite(requiredFields),
      makeDeleteRatingFactory()
    )
  );
};
