jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadCategoryByPageController } from "./loadCategoryByPageControllerFactory";

describe("makeLoadCategoryByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadCategoryByPageController();
    expect(result).toBeDefined();
  });
});
