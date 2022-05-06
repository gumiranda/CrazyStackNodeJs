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
});
