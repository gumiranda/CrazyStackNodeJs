jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadUserByPageController } from "./loadUserByPageControllerFactory";

describe("makeLoadUserByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserByPageController();
    expect(result).toBeDefined();
  });
});
