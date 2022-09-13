import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddProductFactory } from "@/slices/product/useCases";
import { AddProductController } from "@/slices/product/controllers";

export const makeAddProductController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addProduct",
    new AddProductController(
      makeValidationComposite(requiredFields),
      makeAddProductFactory()
    )
  );
};
