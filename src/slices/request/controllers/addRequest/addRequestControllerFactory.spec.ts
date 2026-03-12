jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeAddRequestController } from "./addRequestControllerFactory";

describe("makeAddRequestController", () => {
  it("should return a valid instance", () => {
    const result = makeAddRequestController();
    expect(result).toBeDefined();
  });
});
