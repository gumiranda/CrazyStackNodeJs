import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadUserByPageGeoNearFactory } from "@/slices/user/useCases";
import { LoadUserByPageGeoNearController } from "@/slices/user/controllers";

export const makeLoadUserByPageGeoNearController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadUserByPageGeoNear",
    new LoadUserByPageGeoNearController(
      makeValidationComposite(requiredFields),
      makeLoadUserByPageGeoNearFactory()
    )
  );
};
