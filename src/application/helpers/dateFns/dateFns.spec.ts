import {
    addDays,
    addMinutes,
    isPast,
    isBeforeToday,
    intervalDuration,
    addDuration,
    formatISO,
    startOfDay,
    parseISO,
    intervalsOverlapping,
    eachHourInterval,
    eachMinuteOfInterval,
} from "./dateFns";
import MockDate from "mockdate";

describe("dateFns functions", () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });
    afterAll(() => {
        MockDate.reset();
    });
    it("should return added days when i call addDays", () => {
        expect(addDays(new Date(2021, 9, 12), 1)).toBe(
            new Date(2021, 9, 13).toISOString()
        );
    });
    it("should return added minutes when i call addMinutes", () => {
        expect(addMinutes(new Date(2021, 9, 12, 10, 20), 10)).toBe(
            new Date(2021, 9, 12, 10, 30).toISOString()
        );
    });
    it("should return if is past when i call isPast", () => {
        expect(isPast(new Date(2021, 9, 12, 10, 20))).toBe(true);
    });
    it("should return if isBeforeToday when i call isBeforeToday", () => {
        expect(isBeforeToday(new Date(2021, 9, 12, 10, 20))).toBe(true);
    });
    test("intervalDuration function", () => {
        expect(intervalDuration(new Date(2021, 9, 14), new Date(2021, 9, 15))).toEqual({
            days: 1,
            hours: 0,
            minutes: 0,
            months: 0,
            years: 0,
            seconds: 0,
        });
    });
    test("addDuration function", () => {
        const duration = intervalDuration(new Date(2021, 9, 14), new Date(2021, 9, 15));
        const dateTest = formatISO(addDuration(duration, new Date(2021, 9, 14)));
        expect(dateTest).toBe("2021-10-15T00:00:00-03:00");
    });
    test("startOfDay function", () => {
        const todayParseISO = parseISO(
            formatISO(new Date().setHours(3, 0, 0, 0)).replace("-03:00", "") + ".000Z"
        );
        const dateTest = startOfDay(new Date());
        expect(dateTest).toEqual(todayParseISO);
    });
    test("intervalsOverlapping function", () => {
        expect(
            intervalsOverlapping(
                parseISO(formatISO(new Date(2021, 9, 11))),
                parseISO(formatISO(new Date(2021, 9, 12))),
                parseISO(formatISO(new Date(2021, 8, 10))),
                parseISO(formatISO(new Date(2021, 10, 10)))
            )
        ).toBe(true);
    });
    test("intervalsOverlapping function first if", () => {
        expect(
            intervalsOverlapping(
                parseISO(formatISO(new Date(2022, 2, 11))),
                parseISO(formatISO(new Date(2021, 9, 12))),
                parseISO(formatISO(new Date(2021, 8, 10))),
                parseISO(formatISO(new Date(2021, 10, 10)))
            )
        ).toBe(false);
    });
    test("intervalsOverlapping function in ISO Format", () => {
        expect(
            intervalsOverlapping(
                formatISO(new Date(2021, 9, 11)),
                formatISO(new Date(2021, 9, 12)),
                formatISO(new Date(2021, 8, 10)),
                formatISO(new Date(2021, 10, 10))
            )
        ).toBe(true);
    });
    test("eachHourInterval function in ISO Format", () => {
        const dateTest = eachHourInterval(new Date(2021, 9, 11), new Date(2021, 9, 14), {
            step: 1,
        });
        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(73);
    });
    test("eachMinuteOfInterval function with step 39 minutes", () => {
        const dateTest = eachMinuteOfInterval(
            { start: new Date(2021, 9, 11), end: new Date(2021, 9, 12) },
            {
                step: 39,
            }
        );
        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(37);
    });
    test("eachMinuteOfInterval function with step -1 minute", () => {
        let response;
        try {
            response = eachMinuteOfInterval(
                { start: new Date(2021, 9, 11), end: new Date(2021, 9, 12) },
                {
                    step: -1,
                }
            );
        } catch (e: any) {
            response = e.toString();
        }
        expect(response).toBe("Error: Step must be a number greater than 0");
    });
    test("eachMinuteOfInterval function with start greater end", () => {
        let response;
        try {
            response = eachMinuteOfInterval(
                { start: new Date(2021, 9, 13), end: new Date(2021, 9, 12) },
                {
                    step: 10,
                }
            );
        } catch (e: any) {
            response = e.toString();
        }
        expect(response).toBe("Error: Start date is after end date");
    });
    test("eachMinuteOfInterval function with step 122 minutes", () => {
        const dateTest = eachMinuteOfInterval(
            { start: new Date(2021, 9, 11), end: new Date(2021, 9, 12) },
            {
                step: 122,
            }
        );
        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(12);
    });
    test("eachMinuteOfInterval function with step 119 minutes", () => {
        const dateTest = eachMinuteOfInterval(
            { start: new Date(2021, 9, 11), end: new Date(2021, 9, 12) },
            {
                step: 119,
            }
        );
        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(13);
    });
    test("eachMinuteOfInterval function with step 359 minutes", () => {
        const dateTest = eachMinuteOfInterval(
            { start: new Date(2021, 9, 11), end: new Date(2021, 9, 12) },
            {
                step: 359,
            }
        );
        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(5);
    });
    test("eachMinuteOfInterval function with step 479 minutes", () => {
        const dateTest = eachMinuteOfInterval(
            { start: new Date(2021, 9, 11), end: new Date(2021, 9, 12) },
            {
                step: 479,
            }
        );
        expect(dateTest).toBeTruthy();
        expect(dateTest.length).toBe(4);
    });
});
