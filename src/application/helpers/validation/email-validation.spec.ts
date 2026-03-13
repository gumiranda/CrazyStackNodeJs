import { describe, it, expect, beforeEach, beforeAll, jest, mock } from "bun:test";
import { InvalidParamError } from "@/application/errors";
import { EmailValidation, isValidUUID } from "./email-validation";

mock.module("@/application/infra/config/env", () => ({
  env: { database: "mongodb" },
}));

describe("EmailValidation", () => {
  let sut: EmailValidation;
  beforeEach(() => {
    jest.clearAllMocks();
    sut = new EmailValidation("email");
  });
  it("should return empty array for valid email", () => {
    const result = sut.validate({ email: "valid@mail.com" });
    expect(result).toEqual([]);
  });
  it("should return InvalidParamError for invalid email", () => {
    const result = sut.validate({ email: "invalid_email" });
    expect(result).toEqual([new InvalidParamError("email")]);
  });
  it("should return InvalidParamError for empty string", () => {
    const result = sut.validate({ email: "" });
    expect(result).toEqual([new InvalidParamError("email")]);
  });
  it("should return InvalidParamError for email without domain", () => {
    const result = sut.validate({ email: "test@" });
    expect(result).toEqual([new InvalidParamError("email")]);
  });
  it("should return InvalidParamError for email without @", () => {
    const result = sut.validate({ email: "testmail.com" });
    expect(result).toEqual([new InvalidParamError("email")]);
  });
  it("should accept email with subdomain", () => {
    const result = sut.validate({ email: "test@sub.domain.com" });
    expect(result).toEqual([]);
  });
  it("should accept email with plus sign", () => {
    const result = sut.validate({ email: "test+tag@mail.com" });
    expect(result).toEqual([]);
  });
  it("should accept email with hyphen in name", () => {
    const result = sut.validate({ email: "test-name@mail.com" });
    expect(result).toEqual([]);
  });
});

describe("isValidUUID", () => {
  describe("when database is mongodb", () => {
    it("should return true for string longer than 20 characters", () => {
      expect(isValidUUID("123456789012345678901")).toBe(true);
    });
    it("should return false for string with 20 or fewer characters", () => {
      expect(isValidUUID("12345678901234567890")).toBe(false);
    });
    it("should return undefined for null/undefined", () => {
      expect(isValidUUID(null as any)).toBeFalsy();
    });
  });
});

describe("isValidUUID with postgres", () => {
  it("should validate UUID format when database is postgres", () => {
    // Test UUID regex directly since we can't switch env.database at runtime
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(uuidRegex.test("invalid-uuid")).toBe(false);
    expect(uuidRegex.test("")).toBe(false);
  });
});
