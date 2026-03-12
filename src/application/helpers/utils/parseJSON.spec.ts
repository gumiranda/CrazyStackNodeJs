import { parseJSON } from "./parseJSON";

describe("parseJSON", () => {
  it("should parse valid JSON string", () => {
    const result = parseJSON('{"key":"value"}');
    expect(result).toEqual({ key: "value" });
  });
  it("should parse JSON array", () => {
    const result = parseJSON("[1,2,3]");
    expect(result).toEqual([1, 2, 3]);
  });
  it("should parse JSON number", () => {
    const result = parseJSON("42");
    expect(result).toBe(42);
  });
  it("should parse JSON boolean", () => {
    expect(parseJSON("true")).toBe(true);
    expect(parseJSON("false")).toBe(false);
  });
  it("should parse JSON null", () => {
    expect(parseJSON("null")).toBe(null);
  });
  it("should return null for invalid JSON", () => {
    const result = parseJSON("invalid json");
    expect(result).toBeNull();
  });
  it("should return null for undefined", () => {
    const result = parseJSON(undefined);
    expect(result).toBeNull();
  });
  it("should return null for empty string", () => {
    const result = parseJSON("");
    expect(result).toBeNull();
  });
  it("should parse nested objects", () => {
    const result = parseJSON('{"a":{"b":"c"}}');
    expect(result).toEqual({ a: { b: "c" } });
  });
});
