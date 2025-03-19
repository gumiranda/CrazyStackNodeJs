import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeletePlaceFactory } from "@/slices/place/useCases";
import { DeletePlaceController } from "@/slices/place/controllers";

export const makeDeletePlaceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deletePlace",
    new DeletePlaceController(
      makeValidationComposite(requiredFields),
      makeDeletePlaceFactory()
    )
  );
};
