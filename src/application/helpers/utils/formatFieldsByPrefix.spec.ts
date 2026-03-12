import { formatFieldsByPrefix } from "./formatFieldsByPrefix";

describe("formatFieldsByPrefix", () => {
  it("should group fields by prefix", () => {
    const obj = {
      hourStart1: "08:00",
      hourEnd1: "12:00",
      hourStart2: "14:00",
      hourEnd2: "18:00",
    };
    const result = formatFieldsByPrefix(obj, ["hourStart", "hourEnd"]);
    expect(result).toEqual({
      hourStart: { "1": "08:00", "2": "14:00" },
      hourEnd: { "1": "12:00", "2": "18:00" },
    });
  });
  it("should keep keys without matching prefix at root level", () => {
    const obj = {
      name: "John",
      hourStart1: "08:00",
    };
    const result = formatFieldsByPrefix(obj, ["hourStart"]);
    expect(result).toEqual({
      hourStart: { "1": "08:00" },
      name: "John",
    });
  });
  it("should return only prefix keys when no matching fields exist", () => {
    const obj = { name: "John", age: 30 };
    const result = formatFieldsByPrefix(obj, ["hourStart"]);
    expect(result).toEqual({
      hourStart: {},
      name: "John",
      age: 30,
    });
  });
  it("should handle empty object", () => {
    const result = formatFieldsByPrefix({}, ["hourStart"]);
    expect(result).toEqual({ hourStart: {} });
  });
  it("should handle empty prefixes array", () => {
    const obj = { name: "John" };
    const result = formatFieldsByPrefix(obj, []);
    expect(result).toEqual({ name: "John" });
  });
  it("should lowercase the first letter of the remaining key", () => {
    const obj = { prefixName: "value" };
    const result = formatFieldsByPrefix(obj, ["prefix"]);
    expect(result).toEqual({ prefix: { name: "value" } });
  });
  it("should handle multiple prefixes with overlapping keys", () => {
    const obj = {
      dayStart1: "mon",
      dayEnd1: "fri",
      dayStart2: "tue",
    };
    const result = formatFieldsByPrefix(obj, ["dayStart", "dayEnd"]);
    expect(result).toEqual({
      dayStart: { "1": "mon", "2": "tue" },
      dayEnd: { "1": "fri" },
    });
  });
});
