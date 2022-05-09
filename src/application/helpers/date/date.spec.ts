import MockDate from "mockdate";
import { getHoursObject, GetHoursObjectInput } from "./date";

describe("date tests business rules", () => {
    let mockHoursObject: GetHoursObjectInput;
    beforeAll(async () => {
        MockDate.set(new Date());
        mockHoursObject = {
            hourStart1: "8:00",
            hourEnd1: "18:00",
            hourLunchEnd1: "13:00",
            hourLunchStart1: "12:00",
            hourStart2: "8:00",
            hourEnd2: "18:00",
            hourLunchEnd2: "13:00",
            hourLunchStart2: "12:00",
            hourStart3: "8:00",
            hourEnd3: "18:00",
            hourLunchEnd3: "13:00",
            hourLunchStart3: "12:00",
            days1: {
                monday1: true,
                sunday1: false,
                tuesday1: true,
                thursday1: true,
                friday1: true,
                wednsday1: false,
                saturday1: false,
            },
            days2: {
                monday2: false,
                sunday2: false,
                tuesday2: false,
                thursday2: false,
                friday2: false,
                wednsday2: true,
                saturday2: false,
            },
            days3: {
                monday3: false,
                sunday3: false,
                tuesday3: false,
                thursday3: false,
                friday3: false,
                wednsday3: false,
                saturday3: true,
            },
            dayOfWeek1: "monday1",
            dayOfWeek2: "monday2",
            dayOfWeek3: "monday3",
        };
    });

    afterAll(async () => {
        MockDate.reset();
    });
    test("getHoursObject function when dayOfWeek matches in days1", async () => {
        expect(getHoursObject(mockHoursObject)).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: ["13", "00"],
            hourLunchStart: ["12", "00"],
        });
    });
    test("getHoursObject function when dayOfWeek matches in days2", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "wednsday1",
                dayOfWeek2: "wednsday2",
                dayOfWeek3: "wednsday3",
            })
        ).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: ["13", "00"],
            hourLunchStart: ["12", "00"],
        });
    });
    test("getHoursObject function when dayOfWeek matches in days3", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "saturday1",
                dayOfWeek2: "saturday2",
                dayOfWeek3: "saturday3",
            })
        ).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: ["13", "00"],
            hourLunchStart: ["12", "00"],
        });
    });
    test("getHoursObject function when dayOfWeek matches in days3", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "saturday1",
                dayOfWeek2: "saturday2",
                dayOfWeek3: "saturday3",
            })
        ).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: ["13", "00"],
            hourLunchStart: ["12", "00"],
        });
    });
    test("getHoursObject function when dayOfWeek matches in days3 without hourLunch", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "saturday1",
                dayOfWeek2: "saturday2",
                dayOfWeek3: "saturday3",
                hourLunchStart3: "",
                hourLunchEnd3: "",
            })
        ).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: [""],
            hourLunchStart: [""],
        });
    });
    test("getHoursObject function when dayOfWeek matches in days3 with hourLunch null", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "saturday1",
                dayOfWeek2: "saturday2",
                dayOfWeek3: "saturday3",
                hourLunchStart3: null,
                hourLunchEnd3: null,
            })
        ).toEqual({
            hourStart: ["8", "00"],
            hourEnd: ["18", "00"],
            hourLunchEnd: undefined,
            hourLunchStart: undefined,
        });
    });
    test("getHoursObject function when function receives null", async () => {
        expect(getHoursObject(null as any)).toEqual({
            hourStart: "",
            hourEnd: "",
            hourLunchEnd: "",
            hourLunchStart: "",
        });
    });
    test("getHoursObject function when dayOfWeek matches nobody", async () => {
        expect(
            getHoursObject({
                ...mockHoursObject,
                dayOfWeek1: "sunday1",
                dayOfWeek2: "sunday2",
                dayOfWeek3: "sunday3",
            })
        ).toEqual({
            hourStart: "",
            hourEnd: "",
            hourLunchEnd: "",
            hourLunchStart: "",
        });
    });
});
