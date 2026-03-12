jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeAddPhotoController } from "./addPhotoControllerFactory";

describe("makeAddPhotoController", () => {
  it("should return a valid instance", () => {
    const result = makeAddPhotoController();
    expect(result).toBeDefined();
  });
});
