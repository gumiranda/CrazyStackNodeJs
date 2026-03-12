jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadPhotoController } from "./loadPhotoControllerFactory";

describe("makeLoadPhotoController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadPhotoController();
    expect(result).toBeDefined();
  });
});
