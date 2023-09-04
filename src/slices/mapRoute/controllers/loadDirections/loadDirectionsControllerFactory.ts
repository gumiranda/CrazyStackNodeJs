import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeMapsAdapter } from "@/application/infra/maps";
import { LoadDirectionsController } from "./loadDirectionsController";

export const makeLoadDirectionsController = (): Controller => {
  const requiredFields = ["originId", "destinationId"];
  return makeLogController(
    "loadDirections",
    new LoadDirectionsController(
      makeValidationComposite(requiredFields),
      makeMapsAdapter()
    )
  );
};
