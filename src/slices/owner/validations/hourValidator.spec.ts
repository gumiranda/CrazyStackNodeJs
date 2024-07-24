import MockDate from "mockdate";

import { hourValidator, useMapBusinessHours, validateHours } from "./hourValidator";
describe("hourValidation", () => {
  let fakeBody: any;
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  beforeEach(() => {
    fakeBody = { hourStart1: "8:00", hourEnd1: "12:00" };
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should return null in useMapBusinessHours if body is null", () => {
    const result = useMapBusinessHours({ body: null });
    expect(result).toBeNull();
  });
  it("should return true in useMapBusinessHours if body is correct", () => {
    const result = useMapBusinessHours({
      body: {
        ...fakeBody,
        hourStart1: "8:00",
        hourEnd1: "18:00",
        hourLunchStart1: "12:00",
        hourLunchEnd1: "13:00",
      },
      index: 1,
    });
    expect(result).toStrictEqual({
      haveLunchTime: true,
      hourEnd: new Date("2099-09-18T21:00:00.000Z"),
      hourLunchEnd: new Date("2099-09-18T16:00:00.000Z"),
      hourLunchStart: new Date("2099-09-18T15:00:00.000Z"),
      hourStart: new Date("2099-09-18T11:00:00.000Z"),
    });
  });
  it("should return false in hourValidator if body is null", () => {
    const result = hourValidator(null as any, 1);
    expect(result).toBe(false);
  });
  it("should return false in hourValidator if hourStart1 >= hourEnd1", () => {
    const result = hourValidator({ ...fakeBody, hourStart1: "12:00" }, 1);
    expect(result).toBe(false);
  });
  it("should return false in hourValidator if hourLunchEnd1 <= hourLunchStart1", () => {
    const result = hourValidator(
      {
        ...fakeBody,
        hourStart1: "8:00",
        hourLunchStart1: "13:00",
        hourLunchEnd1: "12:15",
      },
      1
    );
    expect(result).toBe(false);
  });
  it("should return false in hourValidator if hourLunchStart1 <= hourStart1", () => {
    const result = hourValidator(
      {
        ...fakeBody,
        hourStart1: "8:00",
        hourLunchStart1: "7:00",
        hourLunchEnd1: "12:15",
      },
      1
    );
    expect(result).toBe(false);
  });
  it("should return false in hourValidator if hourLunchEnd1 >= hourEnd1", () => {
    const result = hourValidator(
      {
        hourEnd1: "18:00",
        hourStart1: "8:00",
        hourLunchStart1: "12:00",
        hourLunchEnd1: "18:15",
      },
      1
    );
    expect(result).toBe(false);
  });
  it("should return true in hourValidator if all fields are correct", () => {
    const result = hourValidator(
      {
        hourEnd1: "18:00",
        hourStart1: "8:00",
        hourLunchStart1: "12:00",
        hourLunchEnd1: "13:00",
      },
      1
    );
    expect(result).toBe(true);
  });
  it("should return true in validateHours if all fields are correct", () => {
    const result = validateHours({
      hourEnd1: "18:00",
      hourStart1: "8:00",
      hourLunchStart1: "12:00",
      hourLunchEnd1: "13:00",
      hourEnd2: "18:00",
      hourStart2: "8:00",
      hourLunchStart2: "12:00",
      hourLunchEnd2: "13:00",
      hourEnd3: "18:00",
      hourStart3: "8:00",
      hourLunchStart3: "12:00",
      hourLunchEnd3: "13:00",
    });
    expect(result).toBe(true);
  });
  it("should return false in validateHours if at least one hour is incorrect", () => {
    const result = validateHours({
      hourEnd1: "18:00",
      hourStart1: "8:00",
      hourLunchStart1: "12:00",
      hourLunchEnd1: "13:00",
      hourEnd2: "18:00",
      hourStart2: "8:00",
      hourLunchStart2: "12:00",
      hourLunchEnd2: "13:00",
      hourEnd3: "18:00",
      hourStart3: "18:00",
      hourLunchStart3: "12:00",
      hourLunchEnd3: "13:00",
    });
    expect(result).toBe(false);
  });
});
