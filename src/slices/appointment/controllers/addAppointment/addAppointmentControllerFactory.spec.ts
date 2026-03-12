jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeAddAppointmentController } from "./addAppointmentControllerFactory";

describe("makeAddAppointmentController", () => {
  it("should return a valid instance", () => {
    const result = makeAddAppointmentController();
    expect(result).toBeDefined();
  });
});
