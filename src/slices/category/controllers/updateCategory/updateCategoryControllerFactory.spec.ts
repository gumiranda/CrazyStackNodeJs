jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeUpdateCategoryController } from "./updateCategoryControllerFactory";

describe("makeUpdateCategoryController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateCategoryController();
    expect(result).toBeDefined();
  });
});
