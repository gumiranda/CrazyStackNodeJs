import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadChargeFactory } from "@/slices/payment/charge/useCases";
import { LoadChargeController } from "@/slices/payment/charge/controllers";

export const makeLoadChargeController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadCharge",
    new LoadChargeController(
      makeValidationComposite(requiredFields),
      makeLoadChargeFactory()
    )
  );
};
