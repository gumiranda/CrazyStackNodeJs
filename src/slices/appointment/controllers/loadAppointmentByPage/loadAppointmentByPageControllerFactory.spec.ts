jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadAppointmentByPageController } from "./loadAppointmentByPageControllerFactory";

describe("makeLoadAppointmentByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadAppointmentByPageController();
    expect(result).toBeDefined();
  });
});
