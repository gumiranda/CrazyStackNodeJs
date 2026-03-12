jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeDeletePhotoController } from "./deletePhotoControllerFactory";

describe("makeDeletePhotoController", () => {
  it("should return a valid instance", () => {
    const result = makeDeletePhotoController();
    expect(result).toBeDefined();
  });
});
