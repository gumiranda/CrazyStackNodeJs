jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadAvailableTimesController } from "./loadAvailableTimesControllerFactory";

describe("makeLoadAvailableTimesController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadAvailableTimesController();
    expect(result).toBeDefined();
  });
});
