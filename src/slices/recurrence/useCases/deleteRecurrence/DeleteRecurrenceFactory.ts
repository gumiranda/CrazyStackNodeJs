import { MongoRepository } from "@/application/infra";
import { RecurrenceRepository } from "@/slices/recurrence/repositories";
import { deleteRecurrence, DeleteRecurrence } from "@/slices/recurrence/useCases";

export const makeDeleteRecurrenceFactory = (): DeleteRecurrence => {
  const repository = new RecurrenceRepository(new MongoRepository("recurrence"));
  return deleteRecurrence(repository);
};
