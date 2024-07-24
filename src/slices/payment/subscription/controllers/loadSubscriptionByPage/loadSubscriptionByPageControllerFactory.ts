import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadSubscriptionByPageFactory } from "@/slices/payment/subscription/useCases";
import { LoadSubscriptionByPageController } from "@/slices/payment/subscription/controllers";

export const makeLoadSubscriptionByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadSubscriptionByPage",
    new LoadSubscriptionByPageController(
      makeValidationComposite(requiredFields),
      makeLoadSubscriptionByPageFactory()
    )
  );
};
