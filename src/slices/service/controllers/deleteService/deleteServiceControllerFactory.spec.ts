jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeDeleteServiceController } from "./deleteServiceControllerFactory";

describe("makeDeleteServiceController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteServiceController();
    expect(result).toBeDefined();
  });
});
