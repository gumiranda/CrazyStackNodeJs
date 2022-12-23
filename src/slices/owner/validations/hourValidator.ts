import { MissingParamError } from "@/application/errors";
import { mapBusinessHours, startOfDay } from "@/application/helpers";

export const useMapBusinessHours = ({ body, index = 1 }: any) => {
  if (!body) {
    return null;
  }
  return mapBusinessHours({
    infoOwner: {
      ...body,
      [`days${index}`]: {
        [`monday${index}`]: true,
        [`sunday${index}`]: true,
        [`tuesday${index}`]: true,
        [`thursday${index}`]: true,
        [`friday${index}`]: true,
        [`wednsday${index}`]: true,
        [`saturday${index}`]: true,
      },
    },
    dateQuery: startOfDay(new Date("2099-09-18T10:00:00.000Z")),
    dayOfWeekFound: "friday",
  });
};
type handleHoursErrorsInput = {
  errors: any;
  body: HourValidatorInput;
};
export const handleHoursErrors = ({ body, errors }: handleHoursErrorsInput) => {
  const isValid = validateHours(body);
  if (!isValid) {
    errors.push(new MissingParamError("hourStart1"));
  }
};
export const validateHours = (body: HourValidatorInput) => {
  const arrayValidations = [1];
  if (body?.hourStart2 && body?.hourEnd2) {
    arrayValidations.push(2);
  }
  if (body?.hourStart3 && body?.hourEnd3) {
    arrayValidations.push(3);
  }
  for (let i = 0; i < arrayValidations.length; i++) {
    const isValid = hourValidator(body, arrayValidations[i]);
    if (!isValid) {
      return false;
    }
  }
  return true;
};
export type HourValidatorInput = {
  hourStart1: string;
  hourEnd1: string;
  hourLunchStart1?: string;
  hourLunchEnd1?: string;
  hourStart2?: string;
  hourEnd2?: string;
  hourLunchStart2?: string;
  hourLunchEnd2?: string;
  hourStart3?: string;
  hourEnd3?: string;
  hourLunchStart3?: string;
  hourLunchEnd3?: string;
};
export const hourValidator = (body: HourValidatorInput, index = 1) => {
  const { hourStart, hourEnd, hourLunchStart, hourLunchEnd, haveLunchTime } =
    useMapBusinessHours({ body, index }) || {};
  if (!hourStart || !hourEnd) {
    return false;
  }
  if (hourEnd <= hourStart) {
    return false;
  }
  if (haveLunchTime && hourLunchEnd && hourLunchStart) {
    if (hourLunchEnd <= hourLunchStart) {
      return false;
    }
    if (hourLunchStart <= hourStart) {
      return false;
    }
    if (hourLunchEnd >= hourEnd) {
      return false;
    }
  }
  return true;
};
