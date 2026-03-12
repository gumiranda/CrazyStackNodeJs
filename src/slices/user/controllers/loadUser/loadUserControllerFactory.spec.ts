jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadUserController } from "./loadUserControllerFactory";

describe("makeLoadUserController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserController();
    expect(result).toBeDefined();
  });
});
