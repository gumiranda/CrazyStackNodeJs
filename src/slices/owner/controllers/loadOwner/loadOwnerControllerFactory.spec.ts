jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadOwnerController } from "./loadOwnerControllerFactory";

describe("makeLoadOwnerController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadOwnerController();
    expect(result).toBeDefined();
  });
});
