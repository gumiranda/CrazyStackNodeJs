import { LoadAvailableTimes } from "@/slices/appointment/useCases/loadAvailableTimes";
export type ValidateAvailableTimes = (query: any) => Promise<any | null>;
export const validateAvailableTimes =
    (loadAvailableTimesRepository: LoadAvailableTimes) => async (query: any) => {
        return true;
    };
