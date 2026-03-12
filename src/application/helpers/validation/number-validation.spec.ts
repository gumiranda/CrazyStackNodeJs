import { InvalidParamError } from "@/application/errors";
import { NumberValidation } from "./number-validation";

describe("NumberValidation", () => {
  let sut: NumberValidation;
  beforeEach(() => {
    sut = new NumberValidation("age");
  });
  it("should return empty array for valid number", () => {
    const result = sut.validate({ age: 25 });
    expect(result).toEqual([]);
  });
  it("should return empty array for zero", () => {
    const result = sut.validate({ age: 0 });
    expect(result).toEqual([]);
  });
  it("should return empty array for negative number", () => {
    const result = sut.validate({ age: -5 });
    expect(result).toEqual([]);
  });
  it("should return empty array for string number", () => {
    const result = sut.validate({ age: "123" });
    expect(result).toEqual([]);
  });
  it("should return empty array for float", () => {
    const result = sut.validate({ age: 3.14 });
    expect(result).toEqual([]);
  });
  it("should return InvalidParamError for non-numeric string", () => {
    const result = sut.validate({ age: "abc" });
    expect(result).toEqual([new InvalidParamError("age")]);
  });
  it("should return InvalidParamError for undefined", () => {
    const result = sut.validate({ age: undefined });
    expect(result).toEqual([new InvalidParamError("age")]);
  });
  it("should return empty array for null (Number(null) === 0)", () => {
    const result = sut.validate({ age: null });
    expect(result).toEqual([]);
  });
  it("should return empty array for empty string (Number('') === 0)", () => {
    const result = sut.validate({ age: "" });
    expect(result).toEqual([]);
  });
  it("should return InvalidParamError if field is missing", () => {
    const result = sut.validate({});
    expect(result).toEqual([new InvalidParamError("age")]);
  });
});
