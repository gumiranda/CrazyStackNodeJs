jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLogController } from "./logControllerFactory";

describe("makeLogController", () => {
  it("should return a valid instance", () => {
    const result = makeLogController();
    expect(result).toBeDefined();
  });
});
