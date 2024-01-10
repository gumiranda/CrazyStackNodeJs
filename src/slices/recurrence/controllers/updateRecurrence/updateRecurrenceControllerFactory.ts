import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateRecurrenceFactory } from "@/slices/recurrence/useCases";
import { UpdateRecurrenceController } from "@/slices/recurrence/controllers";

export const makeUpdateRecurrenceController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateRecurrence",
    new UpdateRecurrenceController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRecurrenceFactory()
    )
  );
};
