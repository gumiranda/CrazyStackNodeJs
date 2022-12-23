import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddRideFactory } from "@/slices/ride/useCases";
import { AddRideController } from "@/slices/ride/controllers";

export const makeAddRideController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addRide",
    new AddRideController(makeValidationComposite(requiredFields), makeAddRideFactory())
  );
};
