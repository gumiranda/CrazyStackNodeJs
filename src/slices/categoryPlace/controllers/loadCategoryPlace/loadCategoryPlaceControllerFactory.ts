import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCategoryPlaceFactory } from "@/slices/categoryPlace/useCases";
import { LoadCategoryPlaceController } from "@/slices/categoryPlace/controllers";

export const makeLoadCategoryPlaceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadCategoryPlace",
    new LoadCategoryPlaceController(
      makeValidationComposite(requiredFields),
      makeLoadCategoryPlaceFactory()
    )
  );
};
