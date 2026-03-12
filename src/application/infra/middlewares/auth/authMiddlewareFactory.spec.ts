
import { makeAuthMiddleware } from "./authMiddlewareFactory";

describe("makeAuthMiddleware", () => {
  it("should return a valid instance", () => {
    const result = makeAuthMiddleware();
    expect(result).toBeDefined();
  });
});
