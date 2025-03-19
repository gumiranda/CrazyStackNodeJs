import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCategoryPlaceByPageFactory } from "@/slices/categoryPlace/useCases";
import { LoadCategoryPlaceByPageController } from "@/slices/categoryPlace/controllers";

export const makeLoadCategoryPlaceByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadCategoryPlaceByPage",
    new LoadCategoryPlaceByPageController(
      makeValidationComposite(requiredFields),
      makeLoadCategoryPlaceByPageFactory()
    )
  );
};
