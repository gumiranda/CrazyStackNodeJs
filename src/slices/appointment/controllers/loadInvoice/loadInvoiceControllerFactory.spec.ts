jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));

import { makeLoadInvoiceController } from "./loadInvoiceControllerFactory";

describe("makeLoadInvoiceController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadInvoiceController();
    expect(result).toBeDefined();
  });
});
