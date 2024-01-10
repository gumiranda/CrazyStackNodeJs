import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddOrderFactory } from "@/slices/order/useCases";
import { AddOrderController } from "@/slices/order/controllers";

export const makeAddOrderController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addOrder",
    new AddOrderController(makeValidationComposite(requiredFields), makeAddOrderFactory())
  );
};
