import { utcToZonedTime as utcToZonedTimeDateFns } from "date-fns-tz";
import {
    addDays as addDaysDateFns,
    isToday as isTodayDateFns,
    subMinutes as subMinutesDateFns,
    getDay as getDayDateFns,
    addMinutes as addMinutesDateFns,
    isPast as isPastDateFns,
    addHours as addHoursDateFns,
    eachHourOfInterval as eachHourOfIntervalDateFns,
    intervalToDuration as intervalToDurationDateFns,
    areIntervalsOverlapping as areIntervalsOverlappingDateFns,
    setMinutes as setMinutesDateFns,
    setHours as setHoursDateFns,
    endOfDay as endOfDayDateFns,
    startOfDay as startOfDayDateFns,
    add as addDateFns,
    formatISO as formatISODateFns,
    isAfter as isAfterDateFns,
    parseISO as parseISODateFns,
    toDate as toDateDateFns,
    differenceInMinutes as differenceInMinutesDateFns,
    setMilliseconds as setMillisecondsDateFns,
    setSeconds as setSecondsDateFns,
    isBefore as isBeforeDateFns,
    differenceInDays as differenceInDaysDateFns,
    subDays as subDaysDateFns,
} from "date-fns";

type Options = {
    step?: number;
};

type Duration = {
    year?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
};

export const addDays = (date: number | Date, amount: number): string => {
    return addDaysDateFns(date, amount)?.toISOString?.();
};
export const addMinutes = (date: number | Date, amount: number): string => {
    return addMinutesDateFns(date, amount)?.toISOString?.();
};
