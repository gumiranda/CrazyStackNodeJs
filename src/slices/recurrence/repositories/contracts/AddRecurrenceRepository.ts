import { RecurrenceData } from "@/slices/recurrence/entities";

export interface AddRecurrenceRepository {
    addRecurrence(recurrence: RecurrenceData): Promise<RecurrenceData | null>;
}
