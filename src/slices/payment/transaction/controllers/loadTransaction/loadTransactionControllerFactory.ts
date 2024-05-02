import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadTransactionFactory } from "@/slices/payment/transaction/useCases";
import { LoadTransactionController } from "@/slices/payment/transaction/controllers";

export const makeLoadTransactionController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadTransaction",
    new LoadTransactionController(
      makeValidationComposite(requiredFields),
      makeLoadTransactionFactory()
    )
  );
};
