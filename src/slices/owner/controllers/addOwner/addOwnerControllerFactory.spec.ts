jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeAddOwnerController } from "./addOwnerControllerFactory";

describe("makeAddOwnerController", () => {
  it("should return a valid instance", () => {
    const result = makeAddOwnerController();
    expect(result).toBeDefined();
  });
});
