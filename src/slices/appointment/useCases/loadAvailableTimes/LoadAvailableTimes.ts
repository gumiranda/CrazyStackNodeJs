import { LoadAvailableTimesRepository } from "@/slices/appointment/repositories";
import {
    AvailableTimesModelRepository,
    QueryAvailableTimesRepository,
} from "@/slices/appointment/entities";
//import { getArrayTimes,queryDateGenerator } from "@/application/helpers/date";

export type LoadAvailableTimes = (
    query: QueryAvailableTimesRepository
) => Promise<AvailableTimesModelRepository | null>;
export type LoadAvailableTimesSignature = (
    loadAvailableTimes: LoadAvailableTimesRepository
) => LoadAvailableTimes;
export const loadAvailableTimes: LoadAvailableTimesSignature =
    (loadAvailableTimesRepository: LoadAvailableTimesRepository) =>
    async (query: QueryAvailableTimesRepository) => {
        return loadAvailableTimesRepository.loadAvailableTimes(query);
    };
