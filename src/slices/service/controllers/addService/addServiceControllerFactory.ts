import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddServiceFactory } from "@/slices/service/useCases";
import { AddServiceController } from "@/slices/service/controllers";

export const makeAddServiceController = (): Controller => {
  const requiredFields = [
    "name",
    "description",
    "price",
    "finalPrice",
    "comission",
    "havePromotionalPrice",
    "hasFidelityGenerator",
    "categoryId",
    "duration",
    "productsQuantityNeeded",
    "canPayWithFidelityPoints",
    "appointmentsTotal",
  ];
  return makeLogController(
    "addService",
    new AddServiceController(
      makeValidationComposite(requiredFields),
      makeAddServiceFactory()
    )
  );
};
