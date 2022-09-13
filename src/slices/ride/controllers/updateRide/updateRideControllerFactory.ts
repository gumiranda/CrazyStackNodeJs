import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateRideFactory } from "@/slices/ride/useCases";
import { UpdateRideController } from "@/slices/ride/controllers";

export const makeUpdateRideController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateRide",
    new UpdateRideController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRideFactory()
    )
  );
};
