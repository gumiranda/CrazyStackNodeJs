import { LoadRecurrenceByPageRepository } from "@/slices/recurrence/repositories";
import { RecurrencePaginated } from "@/slices/recurrence/entities";
import { Query } from "@/application/types";

export type LoadRecurrenceByPage = (query: Query) => Promise<RecurrencePaginated | null>;
export type LoadRecurrenceByPageSignature = (
    loadRecurrenceByPage: LoadRecurrenceByPageRepository
) => LoadRecurrenceByPage;
export const loadRecurrenceByPage: LoadRecurrenceByPageSignature =
    (loadRecurrenceByPageRepository: LoadRecurrenceByPageRepository) =>
    async (query: Query) => {
        return loadRecurrenceByPageRepository.loadRecurrenceByPage(query);
    };
