jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoginController } from "./loginControllerFactory";

describe("makeLoginController", () => {
  it("should return a valid instance", () => {
    const result = makeLoginController();
    expect(result).toBeDefined();
  });
});
