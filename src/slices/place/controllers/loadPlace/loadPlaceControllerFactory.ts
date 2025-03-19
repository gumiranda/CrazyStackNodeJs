import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadPlaceFactory } from "@/slices/place/useCases";
import { LoadPlaceController } from "@/slices/place/controllers";

export const makeLoadPlaceController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadPlace",
    new LoadPlaceController(
      makeValidationComposite(requiredFields),
      makeLoadPlaceFactory()
    )
  );
};
