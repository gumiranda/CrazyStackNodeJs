import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteChargeFactory } from "@/slices/payment/charge/useCases";
import { DeleteChargeController } from "@/slices/payment/charge/controllers";

export const makeDeleteChargeController = (): Controller => {
  const requiredFields = ["correlationID"];
  return makeLogController(
    "deleteCharge",
    new DeleteChargeController(
      makeValidationComposite(requiredFields),
      makeDeleteChargeFactory()
    )
  );
};
