jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadAppointmentController } from "./loadAppointmentControllerFactory";

describe("makeLoadAppointmentController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadAppointmentController();
    expect(result).toBeDefined();
  });
});
