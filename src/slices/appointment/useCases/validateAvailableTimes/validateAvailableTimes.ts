import { intervalsOverlapping } from "@/application/helpers/dateFns";
import { QueryVerifyAvailableTimes } from "@/slices/appointment/entities/AppointmentEntity";
import { LoadAvailableTimes } from "@/slices/appointment/useCases/loadAvailableTimes";
import { startOfDay } from "@/application/helpers/dateFns";
export type ValidateAvailableTimes = (
  query: QueryVerifyAvailableTimes
) => Promise<any | null>;
export const validateAvailableTimes =
  (loadAvailableTimes: LoadAvailableTimes) => async (query: QueryVerifyAvailableTimes) => {
    const { initDate = null, endDate = null, date = null } = query || {};
    if (
      !initDate ||
      !endDate ||
      endDate === initDate ||
      new Date(endDate).getTime() <= new Date(initDate).getTime()
    ) {
      return false;
    }
    const { timeAvailable = null, timeAvailableProfessional = null } =
      (await loadAvailableTimes(query)) || {};
    if (!timeAvailable && !timeAvailableProfessional) {
      return false;
    }
    if (!date) {
      query.date = startOfDay(new Date(initDate)).toISOString();
    }
    const result = timeAvailable?.find(({ time }: any) => {
      return new Date(time).getTime() === new Date(initDate).getTime();
    });
    if (!result) {
      const resultAlternative = timeAvailableProfessional?.find((time: any) => {
        return intervalsOverlapping(
          new Date(initDate),
          new Date(endDate),
          new Date(time.initDate),
          new Date(time.endDate)
        );
      });
      return !!resultAlternative;
    }
    return true;
  };
