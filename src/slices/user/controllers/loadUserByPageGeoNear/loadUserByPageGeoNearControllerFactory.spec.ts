jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadUserByPageGeoNearController } from "./loadUserByPageGeoNearControllerFactory";

describe("makeLoadUserByPageGeoNearController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserByPageGeoNearController();
    expect(result).toBeDefined();
  });
});
