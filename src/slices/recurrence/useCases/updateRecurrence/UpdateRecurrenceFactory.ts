import { makeDatabaseInstance } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { updateRecurrence, UpdateRecurrence } from "@/slices/recurrence/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateRecurrenceFactory = (): UpdateRecurrence => {
  const repository = new RecurrenceRepository(
    makeDatabaseInstance(whiteLabel.database, "recurrence")
  );
  return updateRecurrence(repository);
};
