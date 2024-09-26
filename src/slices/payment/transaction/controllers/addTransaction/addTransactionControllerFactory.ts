import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddTransactionFactory } from "@/slices/payment/transaction/useCases";
import { AddTransactionController } from "@/slices/payment/transaction/controllers";

export const makeAddTransactionController = (): Controller => {
  return makeLogController(
    "addTransaction",
    new AddTransactionController(makeValidationComposite([]), makeAddTransactionFactory())
  );
};
