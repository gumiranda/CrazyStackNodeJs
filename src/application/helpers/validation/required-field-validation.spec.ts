import { MissingParamError } from "@/application/errors";
import { RequiredFieldValidation } from "./required-field-validation";

describe("RequiredFieldValidation", () => {
  let sut: RequiredFieldValidation;
  beforeEach(() => {
    sut = new RequiredFieldValidation("field");
  });
  it("should return empty array if field is present", () => {
    const result = sut.validate({ field: "any_value" });
    expect(result).toEqual([]);
  });
  it("should return MissingParamError if field is missing", () => {
    const result = sut.validate({});
    expect(result).toEqual([new MissingParamError("field")]);
  });
  it("should return MissingParamError if field is empty string", () => {
    const result = sut.validate({ field: "" });
    expect(result).toEqual([new MissingParamError("field")]);
  });
  it("should return MissingParamError if field is null", () => {
    const result = sut.validate({ field: null });
    expect(result).toEqual([new MissingParamError("field")]);
  });
  it("should return MissingParamError if field is undefined", () => {
    const result = sut.validate({ field: undefined });
    expect(result).toEqual([new MissingParamError("field")]);
  });
  it("should return empty array if field is 0 (zero)", () => {
    const result = sut.validate({ field: 0 });
    expect(result).toEqual([]);
  });
  it("should return empty array if field is false", () => {
    const result = sut.validate({ field: false });
    expect(result).toEqual([]);
  });
  it("should return empty array if field is a number", () => {
    const result = sut.validate({ field: 123 });
    expect(result).toEqual([]);
  });
  it("should return empty array if field is an object", () => {
    const result = sut.validate({ field: { key: "value" } });
    expect(result).toEqual([]);
  });
  it("should return empty array if field is an array", () => {
    const result = sut.validate({ field: [1, 2, 3] });
    expect(result).toEqual([]);
  });
});
