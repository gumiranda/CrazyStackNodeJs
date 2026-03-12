jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeUpdateAppointmentController } from "./updateAppointmentControllerFactory";

describe("makeUpdateAppointmentController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateAppointmentController();
    expect(result).toBeDefined();
  });
});
