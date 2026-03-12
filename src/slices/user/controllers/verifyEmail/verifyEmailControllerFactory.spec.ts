jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeVerifyEmailController } from "./verifyEmailControllerFactory";

describe("makeVerifyEmailController", () => {
  it("should return a valid instance", () => {
    const result = makeVerifyEmailController();
    expect(result).toBeDefined();
  });
});
