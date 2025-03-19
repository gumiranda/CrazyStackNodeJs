import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadPlaceByPageGeoNearFactory } from "@/slices/place/useCases";
import { LoadPlaceByPageGeoNearController } from "@/slices/place/controllers";

export const makeLoadPlaceByPageGeoNearController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadPlaceByPageGeoNear",
    new LoadPlaceByPageGeoNearController(
      makeValidationComposite(requiredFields),
      makeLoadPlaceByPageGeoNearFactory()
    )
  );
};
