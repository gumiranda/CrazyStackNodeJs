import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeletePhotoFactory } from "@/slices/photo/useCases";
import { DeletePhotoController } from "@/slices/photo/controllers";

export const makeDeletePhotoController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deletePhoto",
    new DeletePhotoController(
      makeValidationComposite(requiredFields),
      makeDeletePhotoFactory()
    )
  );
};
