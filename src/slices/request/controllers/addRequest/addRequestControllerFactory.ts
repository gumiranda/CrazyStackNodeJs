import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddRequestFactory } from "@/slices/request/useCases";
import { AddRequestController } from "@/slices/request/controllers";

export const makeAddRequestController = (): Controller => {
  const requiredFields = [
    "status",
    "message",
    "serviceId",
    "ownerId",
    "clientId",
    "professionalId",
    "createdForId",
    "haveDelivery",
    "haveRecurrence",
    "haveFidelity",
    "haveRide",
    "initDate",
    "endDate",
  ];
  return makeLogController(
    "addRequest",
    new AddRequestController(
      makeValidationComposite(requiredFields),
      makeAddRequestFactory()
    )
  );
};
