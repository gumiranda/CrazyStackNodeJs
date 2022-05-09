import { OwnerAppointmentInfo } from "@/slices/appointment/entities";

export type QueryDate = {
    dayOfWeekFound: string;
    endDay: string;
    initDay: string;
    dateQuery: string;
};

export type BusinessHoursInput = {
    infoOwner: OwnerAppointmentInfo;
    dayOfWeekFound: string;
    dateQuery: string;
};

export type BusinessHoursOutput = {
    hourStart: Date;
    hourEnd: Date;
    hourLunchStart: Date | null;
    hourLunchEnd: Date | null;
};
export type GetHoursObjectInput = OwnerAppointmentInfo & {
    dayOfWeek1: string;
    dayOfWeek2: string;
    dayOfWeek3: string;
};
export type GetHoursObjectOutput = {
    hourStart: string;
    hourEnd: string;
    hourLunchStart: string;
    hourLunchEnd: string;
};
export const mapBusinessHours = (
    businessHoursInput: BusinessHoursInput
): BusinessHoursOutput | null => {
    const { infoOwner, dayOfWeekFound, dateQuery } = businessHoursInput;
    const dayOfWeek1 = dayOfWeekFound + "1";
    const dayOfWeek2 = dayOfWeekFound + "2";
    const dayOfWeek3 = dayOfWeekFound + "3";
    let { hourStart, hourEnd, hourLunchStart, hourLunchEnd } = getHoursObject({
        ...infoOwner,
        dayOfWeek1,
        dayOfWeek2,
        dayOfWeek3,
    });
    return null;
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
    return { hourStart: "", hourEnd: "", hourLunchStart: "", hourLunchEnd: "" };
};
