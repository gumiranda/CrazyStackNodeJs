jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadCategoryController } from "./loadCategoryControllerFactory";

describe("makeLoadCategoryController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadCategoryController();
    expect(result).toBeDefined();
  });
});
