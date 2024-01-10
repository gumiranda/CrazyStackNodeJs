import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCategoryFactory } from "@/slices/category/useCases";
import { LoadCategoryController } from "@/slices/category/controllers";

export const makeLoadCategoryController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadCategory",
    new LoadCategoryController(
      makeValidationComposite(requiredFields),
      makeLoadCategoryFactory()
    )
  );
};
