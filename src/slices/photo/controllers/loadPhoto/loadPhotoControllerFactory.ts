import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadPhotoFactory } from "@/slices/photo/useCases";
import { LoadPhotoController } from "@/slices/photo/controllers";

export const makeLoadPhotoController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadPhoto",
    new LoadPhotoController(
      makeValidationComposite(requiredFields),
      makeLoadPhotoFactory()
    )
  );
};
