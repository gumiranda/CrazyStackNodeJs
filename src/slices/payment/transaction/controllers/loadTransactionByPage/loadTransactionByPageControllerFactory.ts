import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadTransactionByPageFactory } from "@/slices/payment/transaction/useCases";
import { LoadTransactionByPageController } from "@/slices/payment/transaction/controllers";

export const makeLoadTransactionByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadTransactionByPage",
    new LoadTransactionByPageController(
      makeValidationComposite(requiredFields),
      makeLoadTransactionByPageFactory()
    )
  );
};
