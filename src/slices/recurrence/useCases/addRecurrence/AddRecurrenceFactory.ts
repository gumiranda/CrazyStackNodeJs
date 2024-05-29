import { makeDatabaseInstance } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { addRecurrence, AddRecurrence } from "@/slices/recurrence/useCases";

export const makeAddRecurrenceFactory = (): AddRecurrence => {
  const repository = new RecurrenceRepository(
    makeDatabaseInstance("mongodb", "recurrence")
  );
  return addRecurrence(repository);
};
