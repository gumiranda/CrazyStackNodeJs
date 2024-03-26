import MockDate from "mockdate";

import { dayOfWeek, endOfDay, formatISO, startOfDay } from "../dateFns";
import {
  addTimeInArray,
  AddTimeInArrayInput,
  BusinessHoursInput,
  firstStep,
  FirstStepInput,
  getArrayTimes,
  GetArrayTimesInput,
  getDateWithCustomHourAndMinutes,
  GetDateWithCustomHourAndMinutesInput,
  getHoursObject,
  GetHoursObjectInput,
  mapBusinessHours,
  queryDateGenerator,
  secondStep,
} from "./date";

describe("date tests business rules", () => {
  let mockHoursObject: GetHoursObjectInput;
  let mockBusinessHoursInput: BusinessHoursInput;
  let mockGetDateFormatted: GetDateWithCustomHourAndMinutesInput;
  let mockGetArrayTimes: GetArrayTimesInput;
  let mockFirstStep: FirstStepInput;
  let mockAddTimeInArray: AddTimeInArrayInput;
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  beforeEach(async () => {
    mockAddTimeInArray = {
      initDate: new Date(2021, 10, 10, 11, 0, 0),
      endDate: new Date(2021, 10, 10, 11, 30, 0),
      dateQuery: new Date(2021, 10, 10, 0, 0, 0),
      array: [],
    };
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
  test("addTimeInArray function", async () => {
    addTimeInArray(mockAddTimeInArray);
    expect(mockAddTimeInArray.array).toStrictEqual([
      {
        initDate: new Date("2021-11-10T14:00:00.000Z"),
        endDate: new Date("2021-11-10T14:30:00.000Z"),
      },
    ]);
  });
  test("addTimeInArray function when i pass date as string", async () => {
    addTimeInArray({
      ...mockAddTimeInArray,
      initDate: new Date(2021, 10, 10, 11, 0, 0).toISOString(),
      endDate: new Date(2021, 10, 10, 11, 30, 0).toISOString(),
    });
    expect(mockAddTimeInArray.array).toStrictEqual([
      {
        initDate: "2021-11-10T14:00:00.000Z",
        endDate: "2021-11-10T14:30:00.000Z",
      },
    ]);
  });
  test("addTimeInArray function with null as parameters", async () => {
    addTimeInArray(null as any);
    expect(mockAddTimeInArray.array).toStrictEqual([]);
  });
  test("getArrayTimes function with have lunch time", async () => {
    expect(getArrayTimes(mockGetArrayTimes)).toEqual({
      timeAvailable: [
        {
          available: true,
          time: new Date("2021-11-10T11:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T11:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T12:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T12:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T13:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T13:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T14:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T14:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T16:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T16:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T17:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T17:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T18:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T18:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T19:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T19:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T20:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T20:30:00.000Z"),
        },
      ],
      timeAvailableProfessional: [
        {
          endDate: new Date("2021-11-10T15:00:00.000Z"),
          initDate: new Date("2021-11-10T11:00:00.000Z"),
        },
        {
          endDate: new Date("2021-11-10T21:00:00.000Z"),
          initDate: new Date("2021-11-10T16:00:00.000Z"),
        },
      ],
    });
  });
  test("getArrayTimes function with have`t lunch time", async () => {
    expect(
      getArrayTimes({
        ...mockGetArrayTimes,
        infoOwner: {
          ...mockGetArrayTimes.infoOwner,
          hourLunchStart1: null,
          hourLunchEnd1: null,
        },
      })
    ).toEqual({
      timeAvailable: [
        {
          available: true,
          time: new Date("2021-11-10T11:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T11:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T12:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T12:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T13:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T13:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T14:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T14:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T15:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T15:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T16:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T16:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T17:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T17:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T18:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T18:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T19:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T19:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T20:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-11-10T20:30:00.000Z"),
        },
      ],
      timeAvailableProfessional: [
        {
          endDate: new Date("2021-11-10T21:00:00.000Z"),
          initDate: new Date("2021-11-10T11:00:00.000Z"),
        },
      ],
    });
  });
  test("getArrayTimes function when i pass infoOwner null", async () => {
    expect(getArrayTimes({ ...mockGetArrayTimes, infoOwner: null as any })).toEqual({
      timeAvailable: [],
      timeAvailableProfessional: [],
    });
  });
  test("getArrayTimes function when i passed null", async () => {
    expect(getArrayTimes(null as any)).toEqual({
      timeAvailable: [],
      timeAvailableProfessional: [],
    });
  });
  test("firstStep function", async () => {
    firstStep(mockFirstStep);
    expect(mockFirstStep.timeAvailableProfessional).toStrictEqual([
      {
        endDate: new Date("2021-11-10T17:00:00.000Z"),
        initDate: new Date("2021-11-10T16:00:00.000Z"),
      },
    ]);
  });
  test("firstStep function when i pass null", async () => {
    firstStep(null as any);
    expect(mockFirstStep.timeAvailableProfessional).toStrictEqual([]);
  });
  test("firstStep function with one appointment", async () => {
    firstStep({ ...mockFirstStep, haveOnlyOneAppointment: true });
    expect(mockFirstStep.timeAvailableProfessional).toStrictEqual([
      {
        endDate: new Date("2021-11-10T17:00:00.000Z"),
        initDate: new Date("2021-11-10T16:00:00.000Z"),
      },
      {
        endDate: new Date("2021-11-11T00:30:00.000Z"),
        initDate: new Date("2021-11-10T18:30:00.000Z"),
      },
    ]);
  });
  test("firstStep function when i have lunch time and appointment inside first half", async () => {
    const mockFirstStepCustom = {
      hourStart: new Date(2021, 10, 10, 8, 0, 0), //11:00
      hourEnd: new Date(2021, 10, 10, 19, 0, 0), //22:00
      hourLunchStart: new Date(2021, 10, 10, 11, 0, 0), //14:00
      hourLunchEnd: new Date(2021, 10, 10, 12, 0, 0), //15:00
      haveLunchTime: true,
      initDate: new Date(2021, 10, 10, 9, 0, 0).toISOString() as any, //12:00
      endDate: new Date(2021, 10, 10, 9, 30, 0).toISOString() as any, //12:30
      haveOnlyOneAppointment: false,
      dateQuery: new Date(2021, 10, 10, 3, 0),
      timeAvailableProfessional: [],
    };
    firstStep(mockFirstStepCustom);
    expect(mockFirstStepCustom.timeAvailableProfessional).toStrictEqual([
      {
        endDate: new Date("2021-11-10T12:00:00.000Z"),
        initDate: new Date("2021-11-10T11:00:00.000Z"),
      },
    ]);
  });
  test("firstStep function when i have lunch time and appointment inside first half with haveOnlyOneAppointment === true", async () => {
    const mockFirstStepCustom = {
      hourStart: new Date(2021, 10, 10, 8, 0, 0), //11:00
      hourEnd: new Date(2021, 10, 10, 19, 0, 0), //22:00
      hourLunchStart: new Date(2021, 10, 10, 11, 0, 0), //14:00
      hourLunchEnd: new Date(2021, 10, 10, 12, 0, 0), //15:00
      haveLunchTime: true,
      initDate: new Date(2021, 10, 10, 9, 0, 0).toISOString() as any, //12:00
      endDate: new Date(2021, 10, 10, 9, 30, 0).toISOString() as any, //12:30
      haveOnlyOneAppointment: true,
      dateQuery: new Date(2021, 10, 10, 3, 0),
      timeAvailableProfessional: [],
    };
    firstStep(mockFirstStepCustom);
    expect(mockFirstStepCustom.timeAvailableProfessional).toStrictEqual([
      {
        endDate: new Date("2021-11-10T12:00:00.000Z"),
        initDate: new Date("2021-11-10T11:00:00.000Z"),
      },
      {
        endDate: new Date("2021-11-10T14:00:00.000Z"),
        initDate: new Date("2021-11-10T12:30:00.000Z"),
      },
      {
        endDate: new Date("2021-11-10T22:00:00.000Z"),
        initDate: new Date("2021-11-10T15:00:00.000Z"),
      },
    ]);
  });
  test("firstStep function when i have lunch time and appointment inside second half", async () => {
    const mockFirstStepCustom = {
      hourStart: new Date(2021, 10, 10, 8, 0, 0), //11:00
      hourEnd: new Date(2021, 10, 10, 19, 0, 0), //22:00
      hourLunchStart: new Date(2021, 10, 10, 11, 0, 0), //14:00
      hourLunchEnd: new Date(2021, 10, 10, 12, 0, 0), //15:00
      haveLunchTime: true,
      initDate: new Date(2021, 10, 10, 13, 0, 0).toISOString() as any, //16:00
      endDate: new Date(2021, 10, 10, 14, 30, 0).toISOString() as any, //17:30
      haveOnlyOneAppointment: false,
      dateQuery: new Date(2021, 10, 10, 3, 0),
      timeAvailableProfessional: [],
    };
    firstStep(mockFirstStepCustom);
    expect(mockFirstStepCustom.timeAvailableProfessional).toStrictEqual([
      {
        endDate: new Date("2021-11-10T14:00:00.000Z"),
        initDate: new Date("2021-11-10T11:00:00.000Z"),
      },
      {
        endDate: new Date("2021-11-10T16:00:00.000Z"),
        initDate: new Date("2021-11-10T15:00:00.000Z"),
      },
    ]);
  });
  test("firstStep function when i have lunch time and appointment inside second half and haveOnlyOneAppointment === true", async () => {
    const mockFirstStepCustom = {
      hourStart: new Date(2021, 10, 10, 8, 0, 0), //11:00
      hourEnd: new Date(2021, 10, 10, 19, 0, 0), //22:00
      hourLunchStart: new Date(2021, 10, 10, 11, 0, 0), //14:00
      hourLunchEnd: new Date(2021, 10, 10, 12, 0, 0), //15:00
      haveLunchTime: true,
      initDate: new Date(2021, 10, 10, 13, 0, 0).toISOString() as any, //16:00
      endDate: new Date(2021, 10, 10, 14, 30, 0).toISOString() as any, //17:30
      haveOnlyOneAppointment: true,
      dateQuery: new Date(2021, 10, 10, 3, 0),
      timeAvailableProfessional: [],
    };
    firstStep(mockFirstStepCustom);
    expect(mockFirstStepCustom.timeAvailableProfessional).toStrictEqual([
      {
        endDate: new Date("2021-11-10T14:00:00.000Z"),
        initDate: new Date("2021-11-10T11:00:00.000Z"),
      },
      {
        endDate: new Date("2021-11-10T16:00:00.000Z"),
        initDate: new Date("2021-11-10T15:00:00.000Z"),
      },
      {
        endDate: new Date("2021-11-10T22:00:00.000Z"),
        initDate: new Date("2021-11-10T17:30:00.000Z"),
      },
    ]);
  });
  test("secondStep function with appointments with 2 appointments inside first half", async () => {
    const mockSecondStepCustom = {
      hourStart: new Date(2021, 10, 10, 8, 0, 0), //11:00
      hourEnd: new Date(2021, 10, 10, 19, 0, 0), //22:00
      hourLunchStart: new Date(2021, 10, 10, 11, 0, 0), //14:00
      hourLunchEnd: new Date(2021, 10, 10, 12, 0, 0), //15:00
      haveLunchTime: true,
      haveOnlyOneAppointment: false,
      dateQuery: new Date(2021, 10, 10, 3, 0),
      timeAvailableProfessional: [],
      appointments: [
        {
          initDate: "2021-11-10T11:00:00.000Z",
          endDate: "2021-11-10T11:30:00.000Z",
        },
        {
          initDate: "2021-11-10T11:30:00.000Z",
          endDate: "2021-11-10T12:00:00.000Z",
        },
      ],
    };
    secondStep(mockSecondStepCustom);
    expect(mockSecondStepCustom.timeAvailableProfessional).toStrictEqual([
      {
        endDate: new Date("2021-11-10T14:00:00.000Z"),
        initDate: new Date("2021-11-10T12:00:00.000Z"),
      },
      {
        endDate: new Date("2021-11-10T22:00:00.000Z"),
        initDate: new Date("2021-11-10T15:00:00.000Z"),
      },
    ]);
  });
  test("secondStep function when i pass null", async () => {
    const mockSecondStepCustom = {
      hourStart: new Date(2021, 10, 10, 8, 0, 0), //11:00
      hourEnd: new Date(2021, 10, 10, 19, 0, 0), //22:00
      hourLunchStart: new Date(2021, 10, 10, 11, 0, 0), //14:00
      hourLunchEnd: new Date(2021, 10, 10, 12, 0, 0), //15:00
      haveLunchTime: true,
      haveOnlyOneAppointment: false,
      dateQuery: new Date(2021, 10, 10, 3, 0),
      timeAvailableProfessional: [],
      appointments: [
        {
          initDate: "2021-11-10T11:00:00.000Z",
          endDate: "2021-11-10T11:30:00.000Z",
        },
        {
          initDate: "2021-11-10T11:30:00.000Z",
          endDate: "2021-11-10T12:00:00.000Z",
        },
      ],
    };
    secondStep(null as any);
    expect(mockSecondStepCustom.timeAvailableProfessional).toStrictEqual([]);
  });
  test("secondStep function with appointments with 1 appointments inside first half and 1 appointment inside second half", async () => {
    const mockSecondStepCustom = {
      hourStart: new Date(2021, 10, 10, 8, 0, 0), //11:00
      hourEnd: new Date(2021, 10, 10, 19, 0, 0), //22:00
      hourLunchStart: new Date(2021, 10, 10, 11, 0, 0), //14:00
      hourLunchEnd: new Date(2021, 10, 10, 12, 0, 0), //15:00
      haveLunchTime: true,
      haveOnlyOneAppointment: false,
      dateQuery: new Date(2021, 10, 10, 3, 0),
      timeAvailableProfessional: [],
      appointments: [
        {
          initDate: "2021-11-10T11:00:00.000Z",
          endDate: "2021-11-10T12:30:00.000Z",
        },
        {
          initDate: "2021-11-10T15:30:00.000Z",
          endDate: "2021-11-10T16:00:00.000Z",
        },
      ],
    };
    secondStep(mockSecondStepCustom);
    expect(mockSecondStepCustom.timeAvailableProfessional).toStrictEqual([
      {
        endDate: new Date("2021-11-10T14:00:00.000Z"),
        initDate: new Date("2021-11-10T12:30:00.000Z"),
      },
      {
        endDate: new Date("2021-11-10T15:30:00.000Z"),
        initDate: new Date("2021-11-10T15:00:00.000Z"),
      },
      {
        endDate: new Date("2021-11-10T22:00:00.000Z"),
        initDate: new Date("2021-11-10T16:00:00.000Z"),
      },
    ]);
  });
  test("secondStep function with appointments with 2 appointments inside second half", async () => {
    const mockSecondStepCustom = {
      hourStart: new Date(2021, 10, 10, 8, 0, 0), //11:00
      hourEnd: new Date(2021, 10, 10, 19, 0, 0), //22:00
      hourLunchStart: new Date(2021, 10, 10, 11, 0, 0), //14:00
      hourLunchEnd: new Date(2021, 10, 10, 12, 0, 0), //15:00
      haveLunchTime: true,
      haveOnlyOneAppointment: false,
      dateQuery: new Date(2021, 10, 10, 3, 0),
      timeAvailableProfessional: [],
      appointments: [
        {
          initDate: "2021-11-10T11:00:00.000Z",
          endDate: "2021-11-10T12:30:00.000Z",
        },
        {
          initDate: "2021-11-10T15:30:00.000Z",
          endDate: "2021-11-10T16:00:00.000Z",
        },
        {
          initDate: "2021-11-10T16:00:00.000Z",
          endDate: "2021-11-10T17:00:00.000Z",
        },
      ],
    };
    secondStep(mockSecondStepCustom);
    expect(mockSecondStepCustom.timeAvailableProfessional).toStrictEqual([
      {
        endDate: new Date("2021-11-10T14:00:00.000Z"),
        initDate: new Date("2021-11-10T12:30:00.000Z"),
      },
      {
        endDate: new Date("2021-11-10T15:30:00.000Z"),
        initDate: new Date("2021-11-10T15:00:00.000Z"),
      },
      {
        endDate: new Date("2021-11-10T22:00:00.000Z"),
        initDate: new Date("2021-11-10T17:00:00.000Z"),
      },
    ]);
  });

  test("secondStep function without lunch time", async () => {
    const mockSecondStepCustom = {
      hourStart: new Date(2021, 10, 10, 8, 0, 0), //11:00
      hourEnd: new Date(2021, 10, 10, 19, 0, 0), //22:00
      hourLunchStart: null,
      hourLunchEnd: null,
      haveLunchTime: false,
      haveOnlyOneAppointment: false,
      dateQuery: new Date(2021, 10, 10, 0, 0),
      timeAvailableProfessional: [],
      appointments: [
        {
          initDate: "2021-11-10T15:30:00.000Z",
          endDate: "2021-11-10T16:00:00.000Z",
        },
        {
          initDate: "2021-11-10T16:00:00.000Z",
          endDate: "2021-11-10T17:00:00.000Z",
        },
      ],
    };
    secondStep(mockSecondStepCustom);
    expect(mockSecondStepCustom.timeAvailableProfessional).toStrictEqual([
      {
        endDate: new Date("2021-11-10T22:00:00.000Z"),
        initDate: new Date("2021-11-10T17:00:00.000Z"),
      },
    ]);
  });
  test("getArrayTimes function with firstStep and secondStep with appointments array with unique appointment insideFirstHalf with lunch time", async () => {
    const infoOwnerAux = {
      hourEnd2: "18:00",
      hourStart2: "08:00",
      hourLunchStart2: "12:00",
      hourLunchEnd2: "14:00",
      days2: { friday2: true },
      hourStart1: "8:00",
      hourEnd1: "18:00",
      hourLunchEnd1: "13:00",
      hourLunchStart1: "12:00",
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
    const mockCustomGetArrayTimes = {
      infoOwner: infoOwnerAux,
      dayOfWeekFound: "friday",
      dateQuery: new Date(2021, 9, 14, 3, 0),
      duration: 30,
      appointments: [
        {
          initDate: "2021-10-14T12:00:00.000Z",
          endDate: "2021-10-14T12:15:00.000Z",
        },
      ],
    };
    expect(getArrayTimes(mockCustomGetArrayTimes)).toEqual({
      timeAvailable: [
        {
          available: true,
          time: new Date("2021-10-14T11:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T11:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T12:15:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T12:45:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T13:15:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T13:45:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T14:15:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T16:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T16:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T17:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T17:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T18:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T18:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T19:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T19:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T20:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T20:30:00.000Z"),
        },
      ],
      timeAvailableProfessional: [
        {
          endDate: new Date("2021-10-14T12:00:00.000Z"),
          initDate: new Date("2021-10-14T11:00:00.000Z"),
        },
        {
          endDate: new Date("2021-10-14T15:00:00.000Z"),
          initDate: new Date("2021-10-14T12:15:00.000Z"),
        },
        {
          endDate: new Date("2021-10-14T21:00:00.000Z"),
          initDate: new Date("2021-10-14T16:00:00.000Z"),
        },
      ],
    });
  });
  test("getArrayTimes function with firstStep and secondStep with appointments array length === 2 insideFirstHalf with lunch time", async () => {
    const infoOwnerAux2 = {
      hourEnd2: "18:00", //21:00
      hourStart2: "08:00", //11:00
      hourLunchStart2: "12:00", //15:00
      hourLunchEnd2: "14:00", //17:00
      days2: { friday2: true },
      hourStart1: "8:00",
      hourEnd1: "18:00",
      hourLunchEnd1: "13:00",
      hourLunchStart1: "12:00",
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
    const mockCustomGetArrayTimes2 = {
      infoOwner: infoOwnerAux2,
      dayOfWeekFound: "friday",
      dateQuery: new Date(2021, 9, 14, 3, 0),
      duration: 30,
      appointments: [
        {
          initDate: "2021-10-14T12:00:00.000Z",
          endDate: "2021-10-14T12:15:00.000Z",
        },
        {
          initDate: "2021-10-14T12:15:00.000Z",
          endDate: "2021-10-14T12:45:00.000Z",
        },
      ],
    };
    expect(getArrayTimes(mockCustomGetArrayTimes2)).toEqual({
      timeAvailable: [
        {
          available: true,
          time: new Date("2021-10-14T11:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T11:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T12:45:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T13:15:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T13:45:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T14:15:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T16:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T16:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T17:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T17:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T18:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T18:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T19:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T19:30:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T20:00:00.000Z"),
        },
        {
          available: true,
          time: new Date("2021-10-14T20:30:00.000Z"),
        },
      ],
      timeAvailableProfessional: [
        {
          endDate: new Date("2021-10-14T12:00:00.000Z"),
          initDate: new Date("2021-10-14T11:00:00.000Z"),
        },
        {
          endDate: new Date("2021-10-14T15:00:00.000Z"),
          initDate: new Date("2021-10-14T12:45:00.000Z"),
        },
        {
          endDate: new Date("2021-10-14T21:00:00.000Z"),
          initDate: new Date("2021-10-14T16:00:00.000Z"),
        },
      ],
    });
  });
  test("testing queryDateGenerator function when date passed is before today", () => {
    const dateTest = queryDateGenerator("2021-09-18T10:00:00.000Z");
    expect(dateTest).toBeNull();
  });
  test("testing queryDateGenerator function when date passed is after today", () => {
    const dateTest = queryDateGenerator("2099-09-18T10:00:00.000Z");
    expect(dateTest).toEqual({
      dateQuery: startOfDay(new Date("2099-09-18T10:00:00.000Z")),
      dayOfWeekFound: "friday",
      endDay: "2099-09-18T23:59:59-03:00",
      initDay: "2099-09-18T00:00:00-03:00",
    });
  });
  test("testing queryDateGenerator function when date passed is today", () => {
    const date = new Date().setMilliseconds(0);
    const dateTest = queryDateGenerator(formatISO(date));
    expect(dateTest).toEqual({
      dateQuery: new Date(date),
      dayOfWeekFound: dayOfWeek(new Date()),
      endDay: formatISO(endOfDay(new Date())),
      initDay: formatISO(startOfDay(new Date())),
    });
  });
});
