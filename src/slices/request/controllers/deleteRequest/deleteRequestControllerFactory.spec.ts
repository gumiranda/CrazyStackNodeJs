jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeDeleteRequestController } from "./deleteRequestControllerFactory";

describe("makeDeleteRequestController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteRequestController();
    expect(result).toBeDefined();
  });
});
