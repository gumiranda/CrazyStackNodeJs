jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeDeleteOwnerController } from "./deleteOwnerControllerFactory";

describe("makeDeleteOwnerController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteOwnerController();
    expect(result).toBeDefined();
  });
});
