import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateCategoryFactory } from "@/slices/category/useCases";
import { UpdateCategoryController } from "@/slices/category/controllers";

export const makeUpdateCategoryController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateCategory",
    new UpdateCategoryController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateCategoryFactory()
    )
  );
};
