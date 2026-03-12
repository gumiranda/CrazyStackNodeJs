jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeUpdateOwnerController } from "./updateOwnerControllerFactory";

describe("makeUpdateOwnerController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateOwnerController();
    expect(result).toBeDefined();
  });
});
