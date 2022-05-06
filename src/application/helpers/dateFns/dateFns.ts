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

export const eachHourInterval = (
    start: number | Date,
    end: number | Date,
    options: Options
): Date[] => {
    return eachHourOfIntervalDateFns({ start, end }, options);
};
export const eachMinuteOfInterval = (dirtyInterval: any, options: Options): Date[] => {
    const interval = dirtyInterval;
    const startDate = toDateDateFns(interval.start);
    const endDate = toDateDateFns(interval.end);
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    if (startTime > endTime) {
        throw new Error("Start date is after end date");
    }
    const dates: Date[] = [];
    const step = Number(options?.step);
    if (step < 1 || isNaN(step)) {
        throw new Error("Step must be a number greater than 0");
    }
    let currentDate = startDate;
    let dateWithMinutes = currentDate;
    dates.push(toDateDateFns(currentDate));
    while (currentDate.getTime() <= endTime) {
        let floorStep = 60;
        let currentStep = 1;
        if (step > 60 && step <= 120) {
            floorStep = 120;
        } else if (step > 120 && step <= 240) {
            floorStep = 240;
        } else if (step > 240 && step <= 360) {
            floorStep = 360;
        } else if (step > 360 && step <= 480) {
            floorStep = 480;
        }
        const stepDivided = Math.floor(floorStep / step);
        while (currentStep <= stepDivided) {
            dateWithMinutes = addMinutesDateFns(dateWithMinutes, step);
            dateWithMinutes.getTime() <= endTime &&
                dates.push(toDateDateFns(dateWithMinutes));
            currentStep += 1;
        }
        currentDate = addMinutesDateFns(currentDate, step);
    }
    return dates;
};
