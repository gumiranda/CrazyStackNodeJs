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
export const isPast = (date: number | Date): boolean => {
    return isPastDateFns(date);
};
export const startOfDay = (date: number | Date): Date => startOfDayDateFns(date);

export const isBeforeToday = (date: number | Date): boolean => {
    return isBeforeDateFns(date, startOfDayDateFns(new Date()));
};

export const formatISO = (date: number | Date): string => formatISODateFns(date);
export const parseISO = (date: string): Date => parseISODateFns(date);

export const intervalDuration = (start: number | Date, end: number | Date): Duration => {
    return intervalToDurationDateFns({ start, end });
};
export const addDuration = (duration: Duration, date: number | Date): Date => {
    return addDateFns(date, duration);
};

export const intervalsOverlapping = (
    started1: any,
    ended1: any,
    started2: any,
    ended2: any
): boolean => {
    const start1Aux: Date = started1?.getMonth ? started1 : parseISODateFns(started1);
    const start2Aux: Date = started2?.getMonth ? started2 : parseISODateFns(started2);
    const end1Aux: Date = ended1?.getMonth ? ended1 : parseISODateFns(ended1);
    const end2Aux: Date = ended2?.getMonth ? ended2 : parseISODateFns(ended2);
    if (
        start2Aux.getTime() > start1Aux.getTime() ||
        start1Aux.getTime() > end1Aux.getTime() ||
        start2Aux.getTime() > end2Aux.getTime() ||
        end1Aux.getTime() > end2Aux.getTime() ||
        end1Aux.getTime() < start2Aux.getTime()
    ) {
        return false;
    }
    return areIntervalsOverlappingDateFns(
        { start: start1Aux, end: end1Aux },
        { start: start2Aux, end: end2Aux }
    );
};
