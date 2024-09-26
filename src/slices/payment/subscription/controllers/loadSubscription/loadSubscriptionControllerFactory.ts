import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadSubscriptionFactory } from "@/slices/payment/subscription/useCases";
import { LoadSubscriptionController } from "@/slices/payment/subscription/controllers";
import { makeLoadChargeByCustomerFactory } from "@/slices/payment/charge/useCases/loadChargeByCustomer";

export const makeLoadSubscriptionController = (): Controller => {
  return makeLogController(
    "loadSubscription",
    new LoadSubscriptionController(
      makeValidationComposite([]),
      makeLoadSubscriptionFactory(),
      makeLoadChargeByCustomerFactory()
    )
  );
};
