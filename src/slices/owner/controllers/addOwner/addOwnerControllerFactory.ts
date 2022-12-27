import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddOwnerFactory, makeLoadOwnerFactory } from "@/slices/owner/useCases";
import { AddOwnerController } from "@/slices/owner/controllers";

export const makeAddOwnerController = (): Controller => {
  const requiredFields = [
    "description",
    "haveDelivery",
    "minimumTimeForReSchedule",
    "days1",
    "hourStart1",
    "hourEnd1",
  ];
  return makeLogController(
    "addOwner",
    new AddOwnerController(
      makeValidationComposite(requiredFields),
      makeAddOwnerFactory(),
      makeLoadOwnerFactory()
    )
  );
};