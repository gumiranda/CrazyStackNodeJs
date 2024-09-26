import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdatePhotoFactory } from "@/slices/photo/useCases";
import { UpdatePhotoController } from "@/slices/photo/controllers";

export const makeUpdatePhotoController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updatePhoto",
    new UpdatePhotoController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdatePhotoFactory()
    )
  );
};
