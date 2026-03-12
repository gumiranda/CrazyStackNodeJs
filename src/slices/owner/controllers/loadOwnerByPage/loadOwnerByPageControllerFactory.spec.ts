jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadOwnerByPageController } from "./loadOwnerByPageControllerFactory";

describe("makeLoadOwnerByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadOwnerByPageController();
    expect(result).toBeDefined();
  });
});
