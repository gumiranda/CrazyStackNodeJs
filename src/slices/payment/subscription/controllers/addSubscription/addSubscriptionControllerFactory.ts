import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddSubscriptionFactory } from "@/slices/payment/subscription/useCases";
import { AddSubscriptionController } from "@/slices/payment/subscription/controllers";

export const makeAddSubscriptionController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addSubscription",
    new AddSubscriptionController(
      makeValidationComposite(requiredFields),
      makeAddSubscriptionFactory()
    )
  );
};
