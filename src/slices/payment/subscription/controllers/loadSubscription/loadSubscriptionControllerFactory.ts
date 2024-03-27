import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadSubscriptionFactory } from "@/slices/payment/subscription/useCases";
import { LoadSubscriptionController } from "@/slices/payment/subscription/controllers";

export const makeLoadSubscriptionController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadSubscription",
    new LoadSubscriptionController(
      makeValidationComposite(requiredFields),
      makeLoadSubscriptionFactory()
    )
  );
};
