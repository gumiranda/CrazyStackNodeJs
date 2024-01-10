import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadRideFactory } from "@/slices/ride/useCases";
import { LoadRideController } from "@/slices/ride/controllers";

export const makeLoadRideController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadRide",
    new LoadRideController(makeValidationComposite(requiredFields), makeLoadRideFactory())
  );
};
