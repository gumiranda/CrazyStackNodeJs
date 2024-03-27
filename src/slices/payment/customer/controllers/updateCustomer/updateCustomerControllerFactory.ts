import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateCustomerFactory } from "@/slices/payment/customer/useCases";
import { UpdateCustomerController } from "@/slices/payment/customer/controllers";

export const makeUpdateCustomerController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateCustomer",
    new UpdateCustomerController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateCustomerFactory()
    )
  );
};
