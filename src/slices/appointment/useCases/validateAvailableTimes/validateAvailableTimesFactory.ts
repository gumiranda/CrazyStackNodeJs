import {
  makeLoadAvailableTimesFactory,
  validateAvailableTimes,
  ValidateAvailableTimes,
} from "@/slices/appointment/useCases";
export const makeValidateAvailableTimesFactory = (): ValidateAvailableTimes => {
  return validateAvailableTimes(makeLoadAvailableTimesFactory());
};
