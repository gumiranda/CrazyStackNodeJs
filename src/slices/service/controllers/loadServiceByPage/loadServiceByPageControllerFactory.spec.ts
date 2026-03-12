jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadServiceByPageController } from "./loadServiceByPageControllerFactory";

describe("makeLoadServiceByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadServiceByPageController();
    expect(result).toBeDefined();
  });
});
