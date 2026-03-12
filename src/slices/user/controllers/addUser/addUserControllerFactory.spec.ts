jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeAddUserController } from "./addUserControllerFactory";

describe("makeAddUserController", () => {
  it("should return a valid instance", () => {
    const result = makeAddUserController();
    expect(result).toBeDefined();
  });
});
