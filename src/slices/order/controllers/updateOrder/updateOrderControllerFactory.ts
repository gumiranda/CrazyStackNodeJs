import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateOrderFactory } from "@/slices/order/useCases";
import { UpdateOrderController } from "@/slices/order/controllers";

export const makeUpdateOrderController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateOrder",
    new UpdateOrderController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateOrderFactory()
    )
  );
};
