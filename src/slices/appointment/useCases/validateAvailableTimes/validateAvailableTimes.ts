import { QueryVerifyAvailableTimes } from "@/slices/appointment/entities/AppointmentEntity";
import { LoadAvailableTimes } from "@/slices/appointment/useCases/loadAvailableTimes";
export type ValidateAvailableTimes = (
    query: QueryVerifyAvailableTimes
) => Promise<any | null>;
export const validateAvailableTimes =
    (loadAvailableTimesRepository: LoadAvailableTimes) =>
    async (query: QueryVerifyAvailableTimes) => {
        const { initDate = null, endDate = null } = query || {};
        if (
            !initDate ||
            !endDate ||
            endDate === initDate ||
            new Date(endDate).getTime() <= new Date(initDate).getTime()
        ) {
            return null;
        }
        return true;
    };
