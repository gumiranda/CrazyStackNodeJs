import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCustomerFactory } from "@/slices/payment/customer/useCases";
import { LoadCustomerController } from "@/slices/payment/customer/controllers";

export const makeLoadCustomerController = (): Controller => {
  const requiredFields = ["correlationID"];
  return makeLogController(
    "loadCustomer",
    new LoadCustomerController(
      makeValidationComposite(requiredFields),
      makeLoadCustomerFactory()
    )
  );
};
