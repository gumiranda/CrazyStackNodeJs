jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeSignupController } from "./signupControllerFactory";

describe("makeSignupController", () => {
  it("should return a valid instance", () => {
    const result = makeSignupController();
    expect(result).toBeDefined();
  });
});
