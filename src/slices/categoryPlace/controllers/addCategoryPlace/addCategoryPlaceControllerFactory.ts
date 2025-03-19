import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddCategoryPlaceFactory } from "@/slices/categoryPlace/useCases";
import { AddCategoryPlaceController } from "@/slices/categoryPlace/controllers";

export const makeAddCategoryPlaceController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addCategoryPlace",
    new AddCategoryPlaceController(
      makeValidationComposite(requiredFields),
      makeAddCategoryPlaceFactory()
    )
  );
};
