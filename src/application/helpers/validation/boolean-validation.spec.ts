import { InvalidParamError } from "@/application/errors";
import { BooleanValidation } from "./boolean-validation";

describe("BooleanValidation", () => {
  let sut: BooleanValidation;
  beforeEach(() => {
    sut = new BooleanValidation("active");
  });
  it("should return empty array if value is true", () => {
    const result = sut.validate({ active: true });
    expect(result).toEqual([]);
  });
  it("should return empty array if value is false", () => {
    const result = sut.validate({ active: false });
    expect(result).toEqual([]);
  });
  it("should return InvalidParamError if value is string 'true'", () => {
    const result = sut.validate({ active: "true" });
    expect(result).toEqual([new InvalidParamError("active")]);
  });
  it("should return InvalidParamError if value is string 'false'", () => {
    const result = sut.validate({ active: "false" });
    expect(result).toEqual([new InvalidParamError("active")]);
  });
  it("should return InvalidParamError if value is 1", () => {
    const result = sut.validate({ active: 1 });
    expect(result).toEqual([new InvalidParamError("active")]);
  });
  it("should return InvalidParamError if value is 0", () => {
    const result = sut.validate({ active: 0 });
    expect(result).toEqual([new InvalidParamError("active")]);
  });
  it("should return InvalidParamError if value is null", () => {
    const result = sut.validate({ active: null });
    expect(result).toEqual([new InvalidParamError("active")]);
  });
  it("should return InvalidParamError if value is undefined", () => {
    const result = sut.validate({ active: undefined });
    expect(result).toEqual([new InvalidParamError("active")]);
  });
  it("should return InvalidParamError if field is missing", () => {
    const result = sut.validate({});
    expect(result).toEqual([new InvalidParamError("active")]);
  });
});
