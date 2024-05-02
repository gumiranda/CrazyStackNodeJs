import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteTransactionFactory } from "@/slices/payment/transaction/useCases";
import { DeleteTransactionController } from "@/slices/payment/transaction/controllers";

export const makeDeleteTransactionController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteTransaction",
    new DeleteTransactionController(
      makeValidationComposite(requiredFields),
      makeDeleteTransactionFactory()
    )
  );
};
