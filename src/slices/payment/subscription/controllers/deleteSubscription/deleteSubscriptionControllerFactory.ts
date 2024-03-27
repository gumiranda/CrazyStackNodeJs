import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteSubscriptionFactory } from "@/slices/payment/subscription/useCases";
import { DeleteSubscriptionController } from "@/slices/payment/subscription/controllers";

export const makeDeleteSubscriptionController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteSubscription",
    new DeleteSubscriptionController(
      makeValidationComposite(requiredFields),
      makeDeleteSubscriptionFactory()
    )
  );
};
