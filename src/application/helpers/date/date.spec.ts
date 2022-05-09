import MockDate from "mockdate";
import {
    BusinessHoursInput,
    getHoursObject,
    GetHoursObjectInput,
    mapBusinessHours,
    getDateWithCustomHourAndMinutes,
    GetDateWithCustomHourAndMinutesInput,
    getArrayTimes,
    GetArrayTimesInput,
    firstStep,
    FirstStepInput,
    AddTimeInArrayInput,
    addTimeInArray,
} from "./date";

describe("date tests business rules", () => {
    let mockHoursObject: GetHoursObjectInput;
    let mockBusinessHoursInput: BusinessHoursInput;
    let mockGetDateFormatted: GetDateWithCustomHourAndMinutesInput;
    let mockGetArrayTimes: GetArrayTimesInput;
    let mockFirstStep: FirstStepInput;
    let mockAddTimeInArray: AddTimeInArrayInput;
    beforeEach(() => {
        mockFirstStep = {
            hourStart: new Date(2021, 10, 10, 13, 0, 0),
            hourEnd: new Date(2021, 10, 10, 21, 30, 0),
            hourLunchStart: null,
            hourLunchEnd: null,
            haveLunchTime: false,
            initDate: new Date(2021, 10, 10, 14, 0, 0).toISOString() as any,
            endDate: new Date(2021, 10, 10, 15, 30, 0).toISOString() as any,
            haveOnlyOneAppointment: false,
            dateQuery: new Date(2021, 10, 10, 3, 0),
            timeAvailableProfessional: [],
        };
    });
    beforeAll(async () => {
        MockDate.set(new Date());
        mockAddTimeInArray = {
            initDate: new Date(2021, 10, 10, 11, 0, 0),
            endDate: new Date(2021, 10, 10, 11, 30, 0),
            dateQuery: new Date(2021, 10, 10, 0, 0, 0),
            array: [],
        };

        const infoOwner = {
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
        };
        mockGetDateFormatted = { hours: 8, minutes: 0, date: new Date(2021, 10, 10) };
        mockBusinessHoursInput = {
            infoOwner,
            dayOfWeekFound: "monday",
            dateQuery: new Date(2021, 10, 10),
        };
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
        mockGetArrayTimes = {
            infoOwner,
            dayOfWeekFound: "monday",
            dateQuery: new Date(2021, 10, 10),
            duration: 30,
            appointments: [],
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
            hourStart: [],
            hourEnd: [],
            hourLunchEnd: [],
            hourLunchStart: [],
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
            hourStart: [],
            hourEnd: [],
            hourLunchEnd: [],
            hourLunchStart: [],
        });
    });
    test("getDateWithCustomHourAndMinutes function ", async () => {
        expect(getDateWithCustomHourAndMinutes(mockGetDateFormatted)).toStrictEqual(
            new Date("2021-11-10T11:00:00.000Z")
        );
    });
    test("mapBusinessHours function when i pass null as infoOwner", async () => {
        expect(
            mapBusinessHours({ ...mockBusinessHoursInput, infoOwner: null as any })
        ).toBeNull();
    });
    test("mapBusinessHours function", async () => {
        expect(mapBusinessHours(mockBusinessHoursInput)).toStrictEqual({
            hourEnd: new Date("2021-11-10T21:00:00.000Z"),
            hourLunchEnd: new Date("2021-11-10T16:00:00.000Z"),
            hourLunchStart: new Date("2021-11-10T15:00:00.000Z"),
            hourStart: new Date("2021-11-10T11:00:00.000Z"),
            haveLunchTime: true,
        });
    });
    test("mapBusinessHours function without hourLunch", async () => {
        expect(
            mapBusinessHours({
                ...mockBusinessHoursInput,
                infoOwner: {
                    hourStart1: "8:00",
                    hourEnd1: "18:00",
                    hourLunchEnd1: null,
                    hourLunchStart1: null,
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
                },
            })
        ).toStrictEqual({
            hourEnd: new Date("2021-11-10T21:00:00.000Z"),
            hourLunchEnd: null,
            hourLunchStart: null,
            hourStart: new Date("2021-11-10T11:00:00.000Z"),
            haveLunchTime: false,
        });
    });
    // test("addTimeInArray function", async () => {
    //     addTimeInArray(mockAddTimeInArray);
    //     expect(mockAddTimeInArray.array).toStrictEqual([
    //         {
    //             initDate: new Date("2021-11-10T14:00:00.000Z"),
    //             endDate: new Date("2021-11-10T14:30:00.000Z"),
    //         },
    //     ]);
    // });
    // test("getArrayTimes function", async () => {
    //     expect(getArrayTimes(mockGetArrayTimes)).toEqual({
    //         timeAvailable: [],
    //         timeAvailableProfessional: [],
    //     });
    // });
    // test("getArrayTimes function", async () => {
    //     expect(getArrayTimes({ ...mockGetArrayTimes, infoOwner: null as any })).toEqual({
    //         timeAvailable: [],
    //         timeAvailableProfessional: [],
    //     });
    // });
    // test("getArrayTimes function when i passed null", async () => {
    //     expect(getArrayTimes(null as any)).toEqual({
    //         timeAvailable: [],
    //         timeAvailableProfessional: [],
    //     });
    // });
    // test("firstStep function", async () => {
    //     firstStep(mockFirstStep);
    //     expect(mockFirstStep.timeAvailableProfessional).toStrictEqual([
    //         {
    //             endDate: new Date("2021-11-10T17:00:00.000Z"),
    //             initDate: new Date("2021-11-10T16:00:00.000Z"),
    //         },
    //     ]);
    // });
    // test("firstStep function with haveLunchTime ===  true insideFirstHalf === true", async () => {
    //     firstStep({
    //         ...mockFirstStep,
    //         haveLunchTime: true,
    //         hourStart: new Date(2021, 10, 10, 8, 0, 0), //11:00
    //         hourEnd: new Date(2021, 10, 10, 18, 0, 0), //21:00
    //         hourLunchStart: new Date(2021, 10, 10, 10, 0, 0), //13:00
    //         hourLunchEnd: new Date(2021, 10, 10, 11, 0, 0), //14:00
    //         initDate: new Date(2021, 10, 10, 9, 30, 0).toISOString() as any, //12:30
    //         endDate: new Date(2021, 10, 10, 10, 0, 0).toISOString() as any, //13:00
    //         haveOnlyOneAppointment: false,
    //         dateQuery: new Date(2021, 10, 10, 3, 0),
    //     });
    //     expect(mockFirstStep.timeAvailableProfessional).toStrictEqual([
    //         {
    //             endDate: new Date("2021-11-10T12:30:00.000Z"),
    //             initDate: new Date("2021-11-10T11:00:00.000Z"),
    //         },
    //     ]);
    // });
    test("firstStep function with haveLunchTime === true insideSecondHalf === true", async () => {
        firstStep({
            ...mockFirstStep,
            haveLunchTime: true,
            hourStart: new Date(2021, 10, 10, 8, 0, 0).toISOString() as any, //11:00
            hourEnd: new Date(2021, 10, 10, 18, 0, 0), //21:00
            hourLunchStart: new Date(2021, 10, 10, 10, 0, 0), //13:00
            hourLunchEnd: new Date(2021, 10, 10, 11, 0, 0), //14:00
            initDate: new Date(2021, 10, 10, 11, 0, 0).toISOString() as any, //14:00
            endDate: new Date(2021, 10, 10, 13, 0, 0).toISOString() as any, //16:00
            haveOnlyOneAppointment: false,
            dateQuery: new Date(2021, 10, 10, 3, 0),
        });
        expect(mockFirstStep.timeAvailableProfessional).toStrictEqual([
            {
                endDate: new Date("2021-11-10T17:00:00.000Z"),
                initDate: new Date("2021-11-10T16:00:00.000Z"),
            },
        ]);
    });
    // test("firstStep function with one appointment", async () => {
    //     firstStep({ ...mockFirstStep, haveOnlyOneAppointment: true });
    //     expect(mockFirstStep.timeAvailableProfessional).toStrictEqual([
    //         {
    //             endDate: new Date("2021-11-10T17:00:00.000Z"),
    //             initDate: new Date("2021-11-10T16:00:00.000Z"),
    //         },
    //         {
    //             endDate: new Date("2021-11-10T17:00:00.000Z"),
    //             initDate: new Date("2021-11-10T16:00:00.000Z"),
    //         },
    //         {
    //             endDate: new Date("2021-11-11T00:30:00.000Z"),
    //             initDate: new Date("2021-11-10T18:30:00.000Z"),
    //         },
    //     ]);
    // });
});
