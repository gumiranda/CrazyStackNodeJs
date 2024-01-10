import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateRatingFactory } from "@/slices/rating/useCases";
import { UpdateRatingController } from "@/slices/rating/controllers";

export const makeUpdateRatingController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateRating",
    new UpdateRatingController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRatingFactory()
    )
  );
};
