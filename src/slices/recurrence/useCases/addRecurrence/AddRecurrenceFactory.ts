import { MongoRepository } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { addRecurrence, AddRecurrence } from "@/slices/recurrence/useCases";

export const makeAddRecurrenceFactory = (): AddRecurrence => {
  const repository = new RecurrenceRepository(new MongoRepository("recurrence"));
  return addRecurrence(repository);
};
