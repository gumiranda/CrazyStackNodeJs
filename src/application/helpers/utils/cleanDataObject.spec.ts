import { cleanDataObject } from "./cleanDataObject";

describe("cleanDataObject", () => {
  test("should return only allowed fields", () => {
    const result = cleanDataObject({
      forbiddenFields: [],
      allowedFields: ["name", "email"],
      bodyObject: { name: "John", email: "john@test.com", password: "123" },
    });
    expect(result).toEqual({ name: "John", email: "john@test.com" });
  });

  test("should exclude forbidden fields even if they are in allowedFields", () => {
    const result = cleanDataObject({
      forbiddenFields: ["password"],
      allowedFields: ["name", "email", "password"],
      bodyObject: { name: "John", email: "john@test.com", password: "123" },
    });
    expect(result).toEqual({ name: "John", email: "john@test.com" });
  });

  test("should return empty object when no fields match allowedFields", () => {
    const result = cleanDataObject({
      forbiddenFields: [],
      allowedFields: ["age"],
      bodyObject: { name: "John", email: "john@test.com" },
    });
    expect(result).toEqual({});
  });

  test("should return empty object when all fields are forbidden", () => {
    const result = cleanDataObject({
      forbiddenFields: ["name", "email"],
      allowedFields: ["name", "email"],
      bodyObject: { name: "John", email: "john@test.com" },
    });
    expect(result).toEqual({});
  });

  test("should return empty object when bodyObject is empty", () => {
    const result = cleanDataObject({
      forbiddenFields: [],
      allowedFields: ["name"],
      bodyObject: {},
    });
    expect(result).toEqual({});
  });

  test("should handle fields not in bodyObject gracefully", () => {
    const result = cleanDataObject({
      forbiddenFields: [],
      allowedFields: ["name", "nonExistent"],
      bodyObject: { name: "John" },
    });
    expect(result).toEqual({ name: "John" });
  });
});
