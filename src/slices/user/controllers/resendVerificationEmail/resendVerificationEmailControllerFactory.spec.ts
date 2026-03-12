jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeResendVerificationEmailController } from "./resendVerificationEmailControllerFactory";

describe("makeResendVerificationEmailController", () => {
  it("should return a valid instance", () => {
    const result = makeResendVerificationEmailController();
    expect(result).toBeDefined();
  });
});
