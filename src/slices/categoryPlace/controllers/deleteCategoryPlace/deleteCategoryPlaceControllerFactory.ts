import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteCategoryPlaceFactory } from "@/slices/categoryPlace/useCases";
import { DeleteCategoryPlaceController } from "@/slices/categoryPlace/controllers";

export const makeDeleteCategoryPlaceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteCategoryPlace",
    new DeleteCategoryPlaceController(
      makeValidationComposite(requiredFields),
      makeDeleteCategoryPlaceFactory()
    )
  );
};
