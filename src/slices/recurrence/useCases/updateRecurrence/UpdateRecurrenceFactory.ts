import { makeDatabaseInstance } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { updateRecurrence, UpdateRecurrence } from "@/slices/recurrence/useCases";

export const makeUpdateRecurrenceFactory = (): UpdateRecurrence => {
  const repository = new RecurrenceRepository(
    makeDatabaseInstance("mongodb", "recurrence")
  );
  return updateRecurrence(repository);
};
