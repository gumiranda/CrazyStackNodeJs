jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeUpdateUserController } from "./updateUserControllerFactory";

describe("makeUpdateUserController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateUserController();
    expect(result).toBeDefined();
  });
});
