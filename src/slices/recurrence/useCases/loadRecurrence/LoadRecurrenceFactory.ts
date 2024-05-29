import { makeDatabaseInstance } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { loadRecurrence, LoadRecurrence } from "@/slices/recurrence/useCases";

export const makeLoadRecurrenceFactory = (): LoadRecurrence => {
  const repository = new RecurrenceRepository(
    makeDatabaseInstance("mongodb", "recurrence")
  );
  return loadRecurrence(repository);
};
