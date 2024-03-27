import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadChargeByPageFactory } from "@/slices/payment/charge/useCases";
import { LoadChargeByPageController } from "@/slices/payment/charge/controllers";

export const makeLoadChargeByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadChargeByPage",
    new LoadChargeByPageController(
      makeValidationComposite(requiredFields),
      makeLoadChargeByPageFactory()
    )
  );
};
