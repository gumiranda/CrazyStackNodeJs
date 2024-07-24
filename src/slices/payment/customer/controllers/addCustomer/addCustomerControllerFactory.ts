import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddCustomerFactory } from "@/slices/payment/customer/useCases";
import { AddCustomerController } from "@/slices/payment/customer/controllers";

export const makeAddCustomerController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addCustomer",
    new AddCustomerController(
      makeValidationComposite(requiredFields),
      makeAddCustomerFactory()
    )
  );
};
