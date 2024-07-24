import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteCustomerFactory } from "@/slices/payment/customer/useCases";
import { DeleteCustomerController } from "@/slices/payment/customer/controllers";

export const makeDeleteCustomerController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteCustomer",
    new DeleteCustomerController(
      makeValidationComposite(requiredFields),
      makeDeleteCustomerFactory()
    )
  );
};
