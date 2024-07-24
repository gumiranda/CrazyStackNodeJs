import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCustomerByPageFactory } from "@/slices/payment/customer/useCases";
import { LoadCustomerByPageController } from "@/slices/payment/customer/controllers";

export const makeLoadCustomerByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadCustomerByPage",
    new LoadCustomerByPageController(
      makeValidationComposite(requiredFields),
      makeLoadCustomerByPageFactory()
    )
  );
};
