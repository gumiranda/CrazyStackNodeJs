jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeDeleteAppointmentController } from "./deleteAppointmentControllerFactory";

describe("makeDeleteAppointmentController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteAppointmentController();
    expect(result).toBeDefined();
  });
});
