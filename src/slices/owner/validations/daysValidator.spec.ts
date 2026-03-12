import { MissingParamError } from "@/application/errors";
import { daysValidator } from "./daysValidator";

describe("daysValidator", () => {
  it("should not push errors when days1 and days2 do not overlap", () => {
    const errors: Error[] = [];
    daysValidator({
      errors,
      body: {
        days1: {
          monday1: true,
          tuesday1: false,
          wednesday1: false,
          thursday1: false,
          friday1: false,
          saturday1: false,
          sunday1: false,
        },
        days2: {
          monday2: false,
          tuesday2: true,
          wednesday2: false,
          thursday2: false,
          friday2: false,
          saturday2: false,
          sunday2: false,
        },
      },
    });
    expect(errors).toEqual([]);
  });
  it("should push error when days1 and days2 overlap on same day", () => {
    const errors: Error[] = [];
    daysValidator({
      errors,
      body: {
        days1: {
          monday1: true,
          tuesday1: false,
          wednesday1: false,
          thursday1: false,
          friday1: false,
          saturday1: false,
          sunday1: false,
        },
        days2: {
          monday2: true,
          tuesday2: false,
          wednesday2: false,
          thursday2: false,
          friday2: false,
          saturday2: false,
          sunday2: false,
        },
      },
    });
    expect(errors).toEqual([new MissingParamError("days1")]);
  });
  it("should push error when days1 and days3 overlap", () => {
    const errors: Error[] = [];
    daysValidator({
      errors,
      body: {
        days1: {
          monday1: true,
          tuesday1: false,
          wednesday1: false,
          thursday1: false,
          friday1: false,
          saturday1: false,
          sunday1: false,
        },
        days2: {
          monday2: false,
          tuesday2: false,
          wednesday2: false,
          thursday2: false,
          friday2: false,
          saturday2: false,
          sunday2: false,
        },
        days3: {
          monday3: true,
          tuesday3: false,
          wednesday3: false,
          thursday3: false,
          friday3: false,
          saturday3: false,
          sunday3: false,
        },
      },
    });
    expect(errors).toEqual([new MissingParamError("days1")]);
  });
  it("should push error when days2 and days3 overlap", () => {
    const errors: Error[] = [];
    daysValidator({
      errors,
      body: {
        days1: {
          monday1: false,
          tuesday1: false,
          wednesday1: false,
          thursday1: false,
          friday1: false,
          saturday1: false,
          sunday1: false,
        },
        days2: {
          monday2: true,
          tuesday2: false,
          wednesday2: false,
          thursday2: false,
          friday2: false,
          saturday2: false,
          sunday2: false,
        },
        days3: {
          monday3: true,
          tuesday3: false,
          wednesday3: false,
          thursday3: false,
          friday3: false,
          saturday3: false,
          sunday3: false,
        },
      },
    });
    expect(errors).toEqual([new MissingParamError("days1")]);
  });
  it("should not push errors when days1 is missing", () => {
    const errors: Error[] = [];
    daysValidator({ errors, body: {} });
    expect(errors).toEqual([]);
  });
  it("should not push errors when days2 is missing", () => {
    const errors: Error[] = [];
    daysValidator({
      errors,
      body: {
        days1: { monday1: true },
      },
    });
    expect(errors).toEqual([]);
  });
  it("should use default days3 (all false) when days3 is not provided", () => {
    const errors: Error[] = [];
    daysValidator({
      errors,
      body: {
        days1: {
          monday1: false,
          tuesday1: false,
          wednesday1: false,
          thursday1: false,
          friday1: false,
          saturday1: false,
          sunday1: false,
        },
        days2: {
          monday2: false,
          tuesday2: false,
          wednesday2: false,
          thursday2: false,
          friday2: false,
          saturday2: false,
          sunday2: false,
        },
      },
    });
    expect(errors).toEqual([]);
  });
  it("should push multiple errors for multiple overlapping days", () => {
    const errors: Error[] = [];
    daysValidator({
      errors,
      body: {
        days1: {
          monday1: true,
          tuesday1: true,
          wednesday1: false,
          thursday1: false,
          friday1: false,
          saturday1: false,
          sunday1: false,
        },
        days2: {
          monday2: true,
          tuesday2: true,
          wednesday2: false,
          thursday2: false,
          friday2: false,
          saturday2: false,
          sunday2: false,
        },
      },
    });
    expect(errors).toHaveLength(2);
  });
});
