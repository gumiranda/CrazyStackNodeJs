import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadOwnerFactory } from "@/slices/owner/useCases";
import { LoadOwnerController } from "@/slices/owner/controllers";
import { makeLoadServiceByPageFactory } from "@/slices/service/useCases";
import { makeLoadPlaceFactory } from "@/slices/place/useCases";

export const makeLoadOwnerController = (): Controller => {
  return makeLogController(
    "loadOwner",
    new LoadOwnerController(
      makeValidationComposite([]),
      makeLoadOwnerFactory(),
      makeLoadServiceByPageFactory(),
      makeLoadPlaceFactory()
    )
  );
};
