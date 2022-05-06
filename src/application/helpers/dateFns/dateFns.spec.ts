import { addDays, addMinutes } from "./dateFns";
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
});
