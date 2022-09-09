import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCategoryByPageFactory } from "@/slices/category/useCases";
import { LoadCategoryByPageController } from "@/slices/category/controllers";

export const makeLoadCategoryByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadCategoryByPage",
    new LoadCategoryByPageController(
      makeValidationComposite(requiredFields),
      makeLoadCategoryByPageFactory()
    )
  );
};
