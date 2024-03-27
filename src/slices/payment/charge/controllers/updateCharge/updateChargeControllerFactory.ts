import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateChargeFactory } from "@/slices/payment/charge/useCases";
import { UpdateChargeController } from "@/slices/payment/charge/controllers";

export const makeUpdateChargeController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateCharge",
    new UpdateChargeController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateChargeFactory()
    )
  );
};
