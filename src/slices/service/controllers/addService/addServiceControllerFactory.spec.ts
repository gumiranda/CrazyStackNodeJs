jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeAddServiceController } from "./addServiceControllerFactory";

describe("makeAddServiceController", () => {
  it("should return a valid instance", () => {
    const result = makeAddServiceController();
    expect(result).toBeDefined();
  });
});
