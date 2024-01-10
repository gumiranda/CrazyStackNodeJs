import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateOwnerFactory } from "@/slices/owner/useCases";
import { UpdateOwnerController } from "@/slices/owner/controllers";

export const makeUpdateOwnerController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateOwner",
    new UpdateOwnerController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateOwnerFactory()
    )
  );
};
