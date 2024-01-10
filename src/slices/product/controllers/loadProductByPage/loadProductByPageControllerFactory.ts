import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadProductByPageFactory } from "@/slices/product/useCases";
import { LoadProductByPageController } from "@/slices/product/controllers";

export const makeLoadProductByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadProductByPage",
    new LoadProductByPageController(
      makeValidationComposite(requiredFields),
      makeLoadProductByPageFactory()
    )
  );
};
