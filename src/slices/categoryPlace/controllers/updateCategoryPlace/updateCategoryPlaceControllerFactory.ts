import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateCategoryPlaceFactory } from "@/slices/categoryPlace/useCases";
import { UpdateCategoryPlaceController } from "@/slices/categoryPlace/controllers";

export const makeUpdateCategoryPlaceController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateCategoryPlace",
    new UpdateCategoryPlaceController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateCategoryPlaceFactory()
    )
  );
};
