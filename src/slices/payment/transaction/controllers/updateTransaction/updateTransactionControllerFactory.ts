import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateTransactionFactory } from "@/slices/payment/transaction/useCases";
import { UpdateTransactionController } from "@/slices/payment/transaction/controllers";

export const makeUpdateTransactionController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateTransaction",
    new UpdateTransactionController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateTransactionFactory()
    )
  );
};
