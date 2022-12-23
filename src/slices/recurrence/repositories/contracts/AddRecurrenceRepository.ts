import { RecurrenceData } from "@/slices/recurrence/entities";

export interface AddRecurrenceRepository {
  loadRecurrence(arg0: { fields: { _id: any }; options: {} });
  updateRecurrence(arg0: { fields: { _id: any } }, arg1: any);
  addRecurrence(recurrence: RecurrenceData): Promise<RecurrenceData | null>;
}
