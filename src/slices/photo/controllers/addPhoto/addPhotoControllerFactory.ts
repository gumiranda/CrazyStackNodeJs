import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddPhotoFactory } from "@/slices/photo/useCases";
import { AddPhotoController } from "@/slices/photo/controllers";

export const makeAddPhotoController = (): Controller => {
  const requiredFields = ["url", "provider", "key", "expiresIn", "expiresInSeconds"];
  return makeLogController(
    "addPhoto",
    new AddPhotoController(makeValidationComposite(requiredFields), makeAddPhotoFactory())
  );
};
