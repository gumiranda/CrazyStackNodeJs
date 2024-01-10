import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeMapsAdapter } from "@/application/infra/maps";
import { LoadPlacesController } from "@/slices/mapRoute/controllers";

export const makeLoadPlacesController = (): Controller => {
  const requiredFields = ["text"];
  return makeLogController(
    "loadPlaces",
    new LoadPlacesController(makeValidationComposite(requiredFields), makeMapsAdapter())
  );
};
