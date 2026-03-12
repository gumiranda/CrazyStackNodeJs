jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeUpdateServiceController } from "./updateServiceControllerFactory";

describe("makeUpdateServiceController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateServiceController();
    expect(result).toBeDefined();
  });
});
