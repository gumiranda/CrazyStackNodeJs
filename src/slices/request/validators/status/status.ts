import { differenceInMinutes } from "@/application/helpers/dateFns";
import { RequestData } from "@/slices/request/entities";
import {
  NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_FUTURE,
  NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_PAST,
  ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RATE,
  ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_CANCEL,
  ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RESCHEDULE,
  CANCELLED_STATUS_ARRAY,
  RESCHEDULE_STATUS_ARRAY,
  RATED_STATUS_ARRAY,
} from "@/application/constants";

export type StatusIsValidInput = {
  currentRequest: RequestData;
  newStatus: number;
};

export const statusIsValid = (statusIsValidInput: StatusIsValidInput): boolean => {
  const { currentRequest, newStatus = 99 } = statusIsValidInput || {};
  if (!currentRequest || newStatus < 0 || newStatus > 11) {
    return false;
  }
  const { status, initDate: initDateAux } = currentRequest;
  if (status === 0 && newStatus === 4) {
    return true;
  }
  const initDate = new Date(initDateAux);
  const differenceInMinutesBetweenAppointmentDateAndNow: number = differenceInMinutes(
    new Date(),
    initDate
  );
  const appointmentWasHappened = differenceInMinutesBetweenAppointmentDateAndNow > 0;
  const cannotChangeStatusBecauseOfAppointmentDate =
    (NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_FUTURE.includes(newStatus) &&
      appointmentWasHappened) ||
    (NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_PAST.includes(newStatus) &&
      !appointmentWasHappened);
  if (cannotChangeStatusBecauseOfAppointmentDate) {
    return false;
  }
  const validStatusArray = getValidStatusForNewStatus(newStatus);
  if (
    CANCELLED_STATUS_ARRAY.includes(newStatus) &&
    validStatusArray.includes(status) &&
    differenceInMinutesBetweenAppointmentDateAndNow >
      ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_CANCEL
  ) {
    return false;
  } else if (
    RESCHEDULE_STATUS_ARRAY.includes(newStatus) &&
    validStatusArray.includes(status) &&
    differenceInMinutesBetweenAppointmentDateAndNow >
      ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RESCHEDULE
  ) {
    return false;
  } else if (
    RATED_STATUS_ARRAY.includes(newStatus) &&
    validStatusArray.includes(status) &&
    differenceInMinutesBetweenAppointmentDateAndNow >
      ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RATE
  ) {
    return false;
  } else if (validStatusArray.includes(status)) {
    return true;
  }
  return false;
};

export const getValidStatusForNewStatus = (newStatus: number): number[] => {
  switch (newStatus) {
    case 1:
    case 2:
    case 3:
      return [0, 1];
    case 5:
    case 6:
      return [0, 1, 2, 3, 4, 7];
    case 7:
    case 8:
      return [5, 6];
    case 9:
      return [1, 7];
    case 10:
      return [1, 7, 9];
    case 11:
      return [10];
    default:
      return [];
  }
};
