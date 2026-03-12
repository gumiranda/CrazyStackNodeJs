import { InvalidParamError } from "@/application/errors";
import { CompareFieldsValidation } from "./compare-fields-validation";

describe("CompareFieldsValidation", () => {
  let sut: CompareFieldsValidation;
  beforeEach(() => {
    sut = new CompareFieldsValidation("password", "passwordConfirmation");
  });
  it("should return empty array if fields match", () => {
    const result = sut.validate({ password: "123", passwordConfirmation: "123" });
    expect(result).toEqual([]);
  });
  it("should return InvalidParamError if fields do not match", () => {
    const result = sut.validate({ password: "123", passwordConfirmation: "456" });
    expect(result).toEqual([new InvalidParamError("passwordConfirmation")]);
  });
  it("should return InvalidParamError if second field is missing", () => {
    const result = sut.validate({ password: "123" });
    expect(result).toEqual([new InvalidParamError("passwordConfirmation")]);
  });
  it("should return InvalidParamError if first field is missing", () => {
    const result = sut.validate({ passwordConfirmation: "123" });
    expect(result).toEqual([new InvalidParamError("passwordConfirmation")]);
  });
  it("should return empty array if both fields are undefined", () => {
    const result = sut.validate({});
    expect(result).toEqual([]);
  });
  it("should return InvalidParamError for different types", () => {
    const result = sut.validate({ password: 123, passwordConfirmation: "123" });
    expect(result).toEqual([new InvalidParamError("passwordConfirmation")]);
  });
  it("should return empty array for matching booleans", () => {
    const boolSut = new CompareFieldsValidation("a", "b");
    const result = boolSut.validate({ a: true, b: true });
    expect(result).toEqual([]);
  });
  it("should return empty array for matching null values", () => {
    const result = sut.validate({ password: null, passwordConfirmation: null });
    expect(result).toEqual([]);
  });
});
