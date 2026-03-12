jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeUpdateRequestController } from "./updateRequestControllerFactory";

describe("makeUpdateRequestController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateRequestController();
    expect(result).toBeDefined();
  });
});
