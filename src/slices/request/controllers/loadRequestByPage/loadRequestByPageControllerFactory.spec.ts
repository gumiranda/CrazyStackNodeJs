jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadRequestByPageController } from "./loadRequestByPageControllerFactory";

describe("makeLoadRequestByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadRequestByPageController();
    expect(result).toBeDefined();
  });
});
