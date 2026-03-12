jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadPhotoByPageController } from "./loadPhotoByPageControllerFactory";

describe("makeLoadPhotoByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadPhotoByPageController();
    expect(result).toBeDefined();
  });
});
