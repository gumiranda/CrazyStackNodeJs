import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddPlaceFactory } from "@/slices/place/useCases";
import { AddPlaceController } from "@/slices/place/controllers";

export const makeAddPlaceController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addPlace",
    new AddPlaceController(
      makeValidationComposite(requiredFields),
      makeAddPlaceFactory()
    )
  );
};
