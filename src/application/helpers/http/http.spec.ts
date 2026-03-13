import { ok, badRequest, unauthorized, forbidden, serverError } from "./http";
import {
  UnauthorizedError,
  ForbiddenError,
  ServerError,
} from "@/application/errors";

describe("HTTP helpers", () => {
  test("ok should return 200 with data", () => {
    const result = ok({ name: "test" });
    expect(result).toEqual({ statusCode: 200, data: { name: "test" } });
  });

  test("ok should return 200 with null data", () => {
    const result = ok(null);
    expect(result).toEqual({ statusCode: 200, data: null });
  });

  test("badRequest should return 400 with error", () => {
    const error = new Error("bad");
    const result = badRequest(error);
    expect(result.statusCode).toBe(400);
    expect(result.data).toBe(error);
  });

  test("unauthorized should return 401 with UnauthorizedError", () => {
    const result = unauthorized();
    expect(result.statusCode).toBe(401);
    expect(result.data).toBeInstanceOf(UnauthorizedError);
  });

  test("forbidden should return 403 with ForbiddenError", () => {
    const error = { message: "test forbidden" };
    const result = forbidden(error);
    expect(result.statusCode).toBe(403);
    expect(result.data).toBeInstanceOf(ForbiddenError);
  });

  test("serverError should return 500 with ServerError", () => {
    const error = new Error("internal");
    const result = serverError(error);
    expect(result.statusCode).toBe(500);
    expect(result.data).toBeInstanceOf(ServerError);
  });
});
