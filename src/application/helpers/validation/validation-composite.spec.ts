import { describe, it, expect, beforeEach, jest } from "bun:test";
import { Validation } from "@/application/helpers/contracts";
import { ValidationComposite } from "./validation-composite";
import { MissingParamError, InvalidParamError } from "@/application/errors";

describe("ValidationComposite", () => {
  let sut: ValidationComposite;
  let validation1: Validation;
  let validation2: Validation;
  beforeEach(() => {
    jest.clearAllMocks();
    validation1 = { validate: jest.fn().mockReturnValue([]) };
    validation2 = { validate: jest.fn().mockReturnValue([]) };
    sut = new ValidationComposite([validation1, validation2]);
  });
  it("should return empty array if all validations pass", () => {
    const result = sut.validate({ field: "any_value" });
    expect(result).toEqual([]);
  });
  it("should call all validations with correct input", () => {
    const input = { field: "any_value" };
    sut.validate(input);
    expect(validation1.validate).toHaveBeenCalledWith(input);
    expect(validation2.validate).toHaveBeenCalledWith(input);
  });
  it("should return errors from a single failing validation", () => {
    const error = new MissingParamError("field");
    (validation1.validate as jest.Mock).mockReturnValueOnce([error]);
    const result = sut.validate({ field: "" });
    expect(result).toEqual([error]);
  });
  it("should return errors from multiple failing validations", () => {
    const error1 = new MissingParamError("field1");
    const error2 = new InvalidParamError("field2");
    (validation1.validate as jest.Mock).mockReturnValueOnce([error1]);
    (validation2.validate as jest.Mock).mockReturnValueOnce([error2]);
    const result = sut.validate({});
    expect(result).toEqual([error1, error2]);
  });
  it("should flatten multiple errors from a single validation", () => {
    const error1 = new MissingParamError("field1");
    const error2 = new MissingParamError("field2");
    (validation1.validate as jest.Mock).mockReturnValueOnce([error1, error2]);
    const result = sut.validate({});
    expect(result).toEqual([error1, error2]);
  });
  it("should work with empty validations array", () => {
    const composite = new ValidationComposite([]);
    const result = composite.validate({});
    expect(result).toEqual([]);
  });
  it("should skip validations that return null/undefined", () => {
    (validation1.validate as jest.Mock).mockReturnValueOnce(null);
    const result = sut.validate({ field: "any_value" });
    expect(result).toEqual([]);
  });
});
