jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeAddCategoryController } from "./addCategoryControllerFactory";

describe("makeAddCategoryController", () => {
  it("should return a valid instance", () => {
    const result = makeAddCategoryController();
    expect(result).toBeDefined();
  });
});
