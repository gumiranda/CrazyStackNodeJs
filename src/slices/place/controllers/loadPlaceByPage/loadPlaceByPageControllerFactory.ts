import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadPlaceByPageFactory } from "@/slices/place/useCases";
import { LoadPlaceByPageController } from "@/slices/place/controllers";

export const makeLoadPlaceByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadPlaceByPage",
    new LoadPlaceByPageController(
      makeValidationComposite(requiredFields),
      makeLoadPlaceByPageFactory()
    )
  );
};
