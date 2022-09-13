import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteRideFactory } from "@/slices/ride/useCases";
import { DeleteRideController } from "@/slices/ride/controllers";

export const makeDeleteRideController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteRide",
    new DeleteRideController(
      makeValidationComposite(requiredFields),
      makeDeleteRideFactory()
    )
  );
};
