import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadProductFactory } from "@/slices/product/useCases";
import { LoadProductController } from "@/slices/product/controllers";

export const makeLoadProductController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadProduct",
    new LoadProductController(
      makeValidationComposite(requiredFields),
      makeLoadProductFactory()
    )
  );
};
