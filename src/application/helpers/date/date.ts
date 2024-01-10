import { OwnerAppointmentInfo } from "@/slices/appointment/entities";
import {
  cloneDate,
  setHours,
  setMinutes,
  setMili,
  setSeconds,
  parseISO,
  differenceInMinutes,
  intervalsOverlapping,
  eachMinuteOfInterval,
  trataTimezone,
  isBeforeToday,
  isToday,
  startOfDay,
  dayOfWeek,
  formatISO,
  endOfDay,
} from "@/application/helpers/dateFns";

export type QueryDate = {
  dayOfWeekFound: string;
  endDay: string;
  initDay: string;
  dateQuery: string | Date;
};

export type BusinessHoursInput = {
  infoOwner: OwnerAppointmentInfo;
  dayOfWeekFound: string;
  dateQuery: Date;
};

export type BusinessHoursOutput = {
  hourStart: Date;
  hourEnd: Date;
  hourLunchStart: Date | null;
  hourLunchEnd: Date | null;
  haveLunchTime: boolean;
};
export type GetHoursObjectInput = OwnerAppointmentInfo & {
  dayOfWeek1: string;
  dayOfWeek2: string;
  dayOfWeek3: string;
};
export type GetHoursObjectOutput = {
  hourStart: string[];
  hourEnd: string[];
  hourLunchStart: string[];
  hourLunchEnd: string[];
};
export type GetDateWithCustomHourAndMinutesInput = {
  hours: number;
  minutes: number;
  date: Date;
};
export type GetArrayTimesInput = {
  infoOwner: OwnerAppointmentInfo;
  dayOfWeekFound: string;
  dateQuery: Date;
  appointments: Array<any>;
  duration: number;
};
export type AvailableTimesModel = {
  timeAvailable: Array<any>;
  timeAvailableProfessional: Array<any>;
};
export type FirstStepInput = {
  hourStart: Date;
  hourEnd: Date;
  hourLunchStart: Date | null;
  hourLunchEnd: Date | null;
  haveLunchTime: boolean;
  initDate: Date;
  endDate: Date;
  haveOnlyOneAppointment: boolean;
  dateQuery: Date;
  timeAvailableProfessional: Array<any>;
};
export type SecondStepInput = {
  hourStart: Date;
  hourEnd: Date;
  hourLunchStart: Date | null;
  hourLunchEnd: Date | null;
  haveLunchTime: boolean;
  dateQuery: Date;
  timeAvailableProfessional: Array<any>;
  appointments: Array<any>;
};
export type AddTimeInArrayInput = {
  initDate: Date | string;
  endDate: Date | string;
  array: Array<any>;
  dateQuery: Date;
};
export type Schedule = {
  initDate: any;
  endDate: any;
};
export type CalculateTimeAvailableInput = {
  timeAvailableProfessional: Array<any>;
  duration: number;
  timeAvailable: Array<any>;
};
export const getHoursObject = (
  getHoursInput: GetHoursObjectInput
): GetHoursObjectOutput => {
  const {
    hourEnd1,
    hourLunchEnd1,
    hourLunchStart1,
    hourStart1,
    hourEnd2,
    hourEnd3,
    hourLunchEnd2,
    hourLunchEnd3,
    hourLunchStart2,
    hourLunchStart3,
    hourStart2,
    hourStart3,
    days1,
    days2,
    days3,
    dayOfWeek1,
    dayOfWeek2,
    dayOfWeek3,
  } = getHoursInput || {};
  if (days1 && days1[dayOfWeek1] === true) {
    return {
      hourStart: hourStart1?.split?.(":"),
      hourEnd: hourEnd1?.split?.(":"),
      hourLunchStart: hourLunchStart1?.split?.(":"),
      hourLunchEnd: hourLunchEnd1?.split?.(":"),
    };
  } else if (days2 && days2[dayOfWeek2] === true) {
    return {
      hourStart: hourStart2?.split?.(":"),
      hourEnd: hourEnd2?.split?.(":"),
      hourLunchStart: hourLunchStart2?.split?.(":"),
      hourLunchEnd: hourLunchEnd2?.split?.(":"),
    };
  } else if (days3 && days3[dayOfWeek3] === true) {
    return {
      hourStart: hourStart3?.split?.(":"),
      hourEnd: hourEnd3?.split?.(":"),
      hourLunchStart: hourLunchStart3?.split?.(":"),
      hourLunchEnd: hourLunchEnd3?.split?.(":"),
    };
  }
  return { hourStart: [], hourEnd: [], hourLunchStart: [], hourLunchEnd: [] };
};
export const getDateWithCustomHourAndMinutes = (
  getDateWithCustomHourAndMinutesInput: GetDateWithCustomHourAndMinutesInput
): Date => {
  const { hours, minutes, date } = getDateWithCustomHourAndMinutesInput;
  let dateAux = cloneDate(date);
  dateAux = setHours(dateAux, hours);
  dateAux = setMinutes(dateAux, minutes);
  dateAux = setMili(dateAux, 0);
  dateAux = setSeconds(dateAux, 0);
  return cloneDate(dateAux);
};
export const mapBusinessHours = (
  businessHoursInput: BusinessHoursInput
): BusinessHoursOutput | null => {
  const { infoOwner, dayOfWeekFound, dateQuery } = businessHoursInput;
  const dayOfWeek1 = dayOfWeekFound + "1";
  const dayOfWeek2 = dayOfWeekFound + "2";
  const dayOfWeek3 = dayOfWeekFound + "3";
  const {
    hourStart: hourStartMapped,
    hourEnd: hourEndMapped,
    hourLunchStart: hourLunchStartMapped,
    hourLunchEnd: hourLunchEndMapped,
  } = getHoursObject({
    ...infoOwner,
    dayOfWeek1,
    dayOfWeek2,
    dayOfWeek3,
  });
  if (hourStartMapped?.length < 2 || hourEndMapped?.length < 2) {
    return null;
  }
  const hoursStart = Number(hourStartMapped[0]);
  const minutesStart = Number(hourStartMapped[1]);
  const hourStart = getDateWithCustomHourAndMinutes({
    hours: hoursStart,
    minutes: minutesStart,
    date: dateQuery,
  });
  const hoursEnd = Number(hourEndMapped[0]);
  const minutesEnd = Number(hourEndMapped[1]);
  const hourEnd = getDateWithCustomHourAndMinutes({
    hours: hoursEnd,
    minutes: minutesEnd,
    date: dateQuery,
  });
  const haveLunchTime =
    hourLunchStartMapped?.length === 2 && hourLunchEndMapped?.length === 2;
  if (haveLunchTime) {
    const hoursLunchStart = Number(hourLunchStartMapped[0]);
    const minutesLunchStart = Number(hourLunchStartMapped[1]);
    const hourLunchStart = getDateWithCustomHourAndMinutes({
      hours: hoursLunchStart,
      minutes: minutesLunchStart,
      date: dateQuery,
    });
    const hoursLunchEnd = Number(hourLunchEndMapped[0]);
    const minutesLunchEnd = Number(hourLunchEndMapped[1]);
    const hourLunchEnd = getDateWithCustomHourAndMinutes({
      hours: hoursLunchEnd,
      minutes: minutesLunchEnd,
      date: dateQuery,
    });
    return { hourStart, hourEnd, hourLunchStart, hourLunchEnd, haveLunchTime: true };
  }
  return {
    hourStart,
    hourEnd,
    hourLunchStart: null,
    hourLunchEnd: null,
    haveLunchTime: false,
  };
};
export const getArrayTimes = (
  getArrayTimesInput: GetArrayTimesInput
): AvailableTimesModel => {
  const { infoOwner, dayOfWeekFound, dateQuery, appointments, duration } =
    getArrayTimesInput || {};
  const timeAvailable: any = [];
  const timeAvailableProfessional: any = [];
  const businessHours: BusinessHoursOutput | null = mapBusinessHours({
    infoOwner,
    dayOfWeekFound,
    dateQuery,
  });
  if (!businessHours) {
    return { timeAvailable, timeAvailableProfessional };
  }
  const { hourStart, hourEnd, hourLunchStart, hourLunchEnd, haveLunchTime } =
    businessHours;
  if (appointments?.length > 0) {
    const haveOnlyOneAppointment = appointments.length === 1;
    const [firstAppointment] = appointments;
    const { initDate, endDate } = firstAppointment;
    firstStep({
      hourStart,
      hourEnd,
      hourLunchStart,
      hourLunchEnd,
      haveLunchTime,
      initDate,
      endDate,
      haveOnlyOneAppointment,
      dateQuery,
      timeAvailableProfessional,
    });
    if (!haveOnlyOneAppointment) {
      secondStep({
        hourStart,
        hourEnd,
        hourLunchStart,
        hourLunchEnd,
        haveLunchTime,
        dateQuery,
        timeAvailableProfessional,
        appointments,
      });
    }
  } else {
    if (haveLunchTime) {
      addTimeInArray({
        initDate: hourStart,
        endDate: hourLunchStart as any,
        dateQuery,
        array: timeAvailableProfessional,
      });
      addTimeInArray({
        initDate: hourLunchEnd as any,
        endDate: hourEnd,
        dateQuery,
        array: timeAvailableProfessional,
      });
    } else {
      addTimeInArray({
        initDate: hourStart,
        endDate: hourEnd,
        dateQuery,
        array: timeAvailableProfessional,
      });
    }
  }
  calculateTimeAvailable({
    timeAvailableProfessional,
    duration,
    timeAvailable,
  });
  return { timeAvailable, timeAvailableProfessional };
};
export const firstStep = (firstStepInput: FirstStepInput): void => {
  const {
    hourStart,
    hourEnd,
    hourLunchStart,
    hourLunchEnd,
    haveLunchTime,
    initDate,
    endDate,
    haveOnlyOneAppointment,
    dateQuery,
    timeAvailableProfessional,
  } = firstStepInput || {};
  if (haveLunchTime === true) {
    const insideFirstHalf = intervalsOverlapping(
      initDate,
      endDate,
      hourStart,
      hourLunchStart
    );
    const insideSecondHalf = intervalsOverlapping(
      initDate,
      endDate,
      hourLunchEnd,
      hourEnd
    );
    if (insideFirstHalf) {
      addTimeInArray({
        initDate: hourStart,
        endDate: parseISO(initDate as any),
        dateQuery,
        array: timeAvailableProfessional,
      });
      if (haveOnlyOneAppointment) {
        addTimeInArray({
          initDate: parseISO(endDate as any),
          endDate: hourLunchStart as any,
          dateQuery,
          array: timeAvailableProfessional,
        });
        addTimeInArray({
          initDate: hourLunchEnd as any,
          endDate: hourEnd,
          dateQuery,
          array: timeAvailableProfessional,
        });
      }
    } else if (insideSecondHalf) {
      addTimeInArray({
        initDate: hourStart,
        endDate: hourLunchStart as any,
        dateQuery,
        array: timeAvailableProfessional,
      });
      addTimeInArray({
        initDate: hourLunchEnd as any,
        endDate: parseISO(initDate as any),
        dateQuery,
        array: timeAvailableProfessional,
      });
      if (haveOnlyOneAppointment) {
        addTimeInArray({
          initDate: parseISO(endDate as any),
          endDate: hourEnd,
          dateQuery,
          array: timeAvailableProfessional,
        });
      }
    }
  } else {
    addTimeInArray({
      initDate: hourStart,
      endDate: parseISO(initDate as any),
      dateQuery,
      array: timeAvailableProfessional,
    });
    if (haveOnlyOneAppointment) {
      addTimeInArray({
        initDate: parseISO(endDate as any),
        endDate: hourEnd,
        dateQuery,
        array: timeAvailableProfessional,
      });
    }
  }
};
export const secondStep = (secondStepInput: SecondStepInput): void => {
  const {
    hourStart,
    hourEnd,
    hourLunchStart,
    hourLunchEnd,
    haveLunchTime,
    dateQuery,
    timeAvailableProfessional,
    appointments,
  } = secondStepInput || {};
  appointments?.forEach((schedule: Schedule, index: number) => {
    const { initDate: initDateAux, endDate: endDateAux } = schedule;
    const initDateNext = appointments[index + 1]?.initDate;
    const endDateNext = appointments[index + 1]?.endDate;
    const hasNext = initDateNext && endDateNext;

    if (!haveLunchTime) {
      if (!hasNext) {
        addTimeInArray({
          initDate: parseISO(endDateAux as any),
          endDate: hourEnd,
          dateQuery,
          array: timeAvailableProfessional,
        });
      } else {
        addTimeInArray({
          initDate: parseISO(endDateAux as any),
          endDate: parseISO(initDateNext as any),
          dateQuery,
          array: timeAvailableProfessional,
        });
      }
    } else {
      const insideFirstHalfAux = intervalsOverlapping(
        initDateAux,
        endDateAux,
        hourStart,
        hourLunchStart
      );
      const insideSecondHalfAux = intervalsOverlapping(
        initDateAux,
        endDateAux,
        hourLunchEnd,
        hourEnd
      );
      const nextInsideFirstHalf =
        hasNext &&
        intervalsOverlapping(initDateNext, endDateNext, hourStart, hourLunchStart);

      const nextInsideSecondHalf =
        hasNext && intervalsOverlapping(initDateNext, endDateNext, hourLunchEnd, hourEnd);

      if (insideFirstHalfAux) {
        if (!hasNext) {
          addTimeInArray({
            initDate: parseISO(endDateAux as any),
            endDate: hourLunchStart as any,
            dateQuery,
            array: timeAvailableProfessional,
          });
          addTimeInArray({
            initDate: hourLunchEnd as any,
            endDate: hourEnd,
            dateQuery,
            array: timeAvailableProfessional,
          });
        } else {
          if (nextInsideFirstHalf) {
            addTimeInArray({
              initDate: parseISO(endDateAux as any),
              endDate: parseISO(initDateNext as any),
              dateQuery,
              array: timeAvailableProfessional,
            });
          } else if (nextInsideSecondHalf) {
            addTimeInArray({
              initDate: parseISO(endDateAux as any),
              endDate: hourLunchStart as any,
              dateQuery,
              array: timeAvailableProfessional,
            });
            addTimeInArray({
              initDate: hourLunchEnd as any,
              endDate: parseISO(initDateNext as any),
              dateQuery,
              array: timeAvailableProfessional,
            });
          }
        }
      } else if (insideSecondHalfAux) {
        if (!hasNext) {
          addTimeInArray({
            initDate: parseISO(endDateAux as any),
            endDate: hourEnd,
            dateQuery,
            array: timeAvailableProfessional,
          });
        } else if (nextInsideSecondHalf) {
          addTimeInArray({
            initDate: parseISO(endDateAux as any),
            endDate: parseISO(initDateNext as any),
            dateQuery,
            array: timeAvailableProfessional,
          });
        }
      }
    }
  });
};
export const addTimeInArray = (addTimeInArrayInput: AddTimeInArrayInput): void => {
  const { initDate, endDate, dateQuery, array } = addTimeInArrayInput || {};
  if (
    (initDate &&
      endDate &&
      initDate instanceof Date &&
      endDate instanceof Date &&
      differenceInMinutes(initDate, endDate) < 0 &&
      differenceInMinutes(initDate, dateQuery) > 0) ||
    (initDate &&
      endDate &&
      differenceInMinutes(parseISO(initDate as string), parseISO(endDate as string)) < 0 &&
      differenceInMinutes(parseISO(initDate as string), dateQuery) > 0)
  ) {
    array.push({ initDate, endDate });
  }
};
export const calculateTimeAvailable = (
  calculateTimeAvailableInput: CalculateTimeAvailableInput
): void => {
  const { timeAvailable, duration, timeAvailableProfessional } =
    calculateTimeAvailableInput;
  timeAvailableProfessional.forEach((scheduleTime: Schedule) => {
    const { initDate, endDate } = scheduleTime;
    if (differenceInMinutes(endDate, initDate) >= duration) {
      const arrayBroken = eachMinuteOfInterval(
        { start: initDate, end: endDate },
        { step: duration }
      );
      arrayBroken.pop();
      for (const time of arrayBroken) {
        timeAvailable.push({ time, available: true });
      }
    }
  });
};
export const queryDateGenerator = (date: string): QueryDate | null => {
  const dateRequest = trataTimezone(new Date(date));
  if (!isBeforeToday(dateRequest)) {
    let dateQuery;
    if (isToday(dateRequest)) {
      dateQuery = cloneDate(dateRequest);
    } else {
      dateQuery = startOfDay(dateRequest);
    }
    const dayOfWeekFound = dayOfWeek(dateQuery);
    const endDay = formatISO(endOfDay(dateRequest));
    const initDay = formatISO(startOfDay(dateRequest));
    return { dayOfWeekFound, endDay, initDay, dateQuery };
  }
  return null;
};
