jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeUpdatePhotoController } from "./updatePhotoControllerFactory";

describe("makeUpdatePhotoController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdatePhotoController();
    expect(result).toBeDefined();
  });
});
