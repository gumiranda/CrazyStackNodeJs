jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeDeleteCategoryController } from "./deleteCategoryControllerFactory";

describe("makeDeleteCategoryController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteCategoryController();
    expect(result).toBeDefined();
  });
});
