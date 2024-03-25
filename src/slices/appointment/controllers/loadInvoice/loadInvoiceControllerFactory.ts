import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadInvoiceFactory } from "@/slices/appointment/useCases";
import { LoadInvoiceController } from "@/slices/appointment/controllers";

export const makeLoadInvoiceController = (): Controller => {
  return makeLogController(
    "loadInvoice",
    new LoadInvoiceController(makeValidationComposite([]), makeLoadInvoiceFactory())
  );
};
