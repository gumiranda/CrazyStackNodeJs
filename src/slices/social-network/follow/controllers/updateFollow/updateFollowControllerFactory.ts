import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateFollowFactory } from "@/slices/follow/useCases";
import { UpdateFollowController } from "@/slices/follow/controllers";

export const makeUpdateFollowController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateFollow",
    new UpdateFollowController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateFollowFactory()
    )
  );
};
