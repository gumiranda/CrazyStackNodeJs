import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteOrderFactory } from "@/slices/order/useCases";
import { DeleteOrderController } from "@/slices/order/controllers";

export const makeDeleteOrderController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteOrder",
    new DeleteOrderController(
      makeValidationComposite(requiredFields),
      makeDeleteOrderFactory()
    )
  );
};
