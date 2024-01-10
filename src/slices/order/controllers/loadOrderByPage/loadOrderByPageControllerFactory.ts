import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadOrderByPageFactory } from "@/slices/order/useCases";
import { LoadOrderByPageController } from "@/slices/order/controllers";

export const makeLoadOrderByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadOrderByPage",
    new LoadOrderByPageController(
      makeValidationComposite(requiredFields),
      makeLoadOrderByPageFactory()
    )
  );
};
