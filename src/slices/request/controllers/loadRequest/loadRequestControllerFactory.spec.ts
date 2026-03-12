jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadRequestController } from "./loadRequestControllerFactory";

describe("makeLoadRequestController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadRequestController();
    expect(result).toBeDefined();
  });
});
