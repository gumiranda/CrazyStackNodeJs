
import { makeLoadInvoiceFactory } from "./LoadInvoiceFactory";

describe("makeLoadInvoiceFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadInvoiceFactory();
    expect(result).toBeDefined();
  });
});
