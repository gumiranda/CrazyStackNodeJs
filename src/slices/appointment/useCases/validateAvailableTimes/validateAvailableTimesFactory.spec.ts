
import { makeValidateAvailableTimesFactory } from "./validateAvailableTimesFactory";

describe("makeValidateAvailableTimesFactory", () => {
  it("should return a valid instance", () => {
    const result = makeValidateAvailableTimesFactory();
    expect(result).toBeDefined();
  });
});
