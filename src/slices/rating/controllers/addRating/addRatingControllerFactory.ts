import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddRatingFactory } from "@/slices/rating/useCases";
import { AddRatingController } from "@/slices/rating/controllers";

export const makeAddRatingController = (): Controller => {
  const requiredFields = ["ratingType", "ratings"];
  return makeLogController(
    "addRating",
    new AddRatingController(
      makeValidationComposite(requiredFields),
      makeAddRatingFactory()
    )
  );
};
