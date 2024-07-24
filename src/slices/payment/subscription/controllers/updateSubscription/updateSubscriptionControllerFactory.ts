import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateSubscriptionFactory } from "@/slices/payment/subscription/useCases";
import { UpdateSubscriptionController } from "@/slices/payment/subscription/controllers";

export const makeUpdateSubscriptionController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateSubscription",
    new UpdateSubscriptionController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateSubscriptionFactory()
    )
  );
};
