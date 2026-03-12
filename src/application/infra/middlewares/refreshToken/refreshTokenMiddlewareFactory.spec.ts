
import { makeRefreshTokenMiddleware } from "./refreshTokenMiddlewareFactory";

describe("makeRefreshTokenMiddleware", () => {
  it("should return a valid instance", () => {
    const result = makeRefreshTokenMiddleware();
    expect(result).toBeDefined();
  });
});
