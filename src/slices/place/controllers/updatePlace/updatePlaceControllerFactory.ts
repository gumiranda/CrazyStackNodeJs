import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdatePlaceFactory } from "@/slices/place/useCases";
import { UpdatePlaceController } from "@/slices/place/controllers";

export const makeUpdatePlaceController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updatePlace",
    new UpdatePlaceController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdatePlaceFactory()
    )
  );
};
