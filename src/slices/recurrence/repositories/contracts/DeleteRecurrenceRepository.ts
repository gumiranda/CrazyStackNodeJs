import { Query } from "@/application/types";
import { RecurrenceData } from "@/slices/recurrence/entities";

export interface DeleteRecurrenceRepository {
    deleteRecurrence(query: Query): Promise<RecurrenceData | null>;
}
