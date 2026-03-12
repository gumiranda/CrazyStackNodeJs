jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadServiceController } from "./loadServiceControllerFactory";

describe("makeLoadServiceController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadServiceController();
    expect(result).toBeDefined();
  });
});
