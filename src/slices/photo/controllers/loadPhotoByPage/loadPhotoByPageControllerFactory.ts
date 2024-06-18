import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadPhotoByPageFactory } from "@/slices/photo/useCases";
import { LoadPhotoByPageController } from "@/slices/photo/controllers";

export const makeLoadPhotoByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadPhotoByPage",
    new LoadPhotoByPageController(
      makeValidationComposite(requiredFields),
      makeLoadPhotoByPageFactory()
    )
  );
};
