import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddChargeFactory } from "@/slices/payment/charge/useCases";
import { AddChargeController } from "@/slices/payment/charge/controllers";

export const makeAddChargeController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addCharge",
    new AddChargeController(
      makeValidationComposite(requiredFields),
      makeAddChargeFactory()
    )
  );
};
