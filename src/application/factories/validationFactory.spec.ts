import { makeValidationComposite } from "./validationFactory";
import { ValidationComposite } from "@/application/helpers/validation/validation-composite";

jest.mock("@/application/infra/config/env", () => ({
  env: { database: "mongodb" },
}));

describe("makeValidationComposite", () => {
  it("should return a ValidationComposite instance", () => {
    const result = makeValidationComposite(["name"]);
    expect(result).toBeInstanceOf(ValidationComposite);
  });
  it("should create validations for required fields", () => {
    const result = makeValidationComposite(["name", "email"]);
    const errors = result.validate({});
    expect(errors.length).toBeGreaterThan(0);
  });
  it("should include CompareFieldsValidation when passwordConfirmation is in fields", () => {
    const result = makeValidationComposite(["password", "passwordConfirmation"]);
    const errors = result.validate({ password: "123", passwordConfirmation: "456" });
    const hasInvalidParam = errors.some((e) => e.message.includes("Invalid param"));
    expect(hasInvalidParam).toBe(true);
  });
  it("should include EmailValidation when email is in fields", () => {
    const result = makeValidationComposite(["email"]);
    const errors = result.validate({ email: "invalid" });
    const hasInvalidParam = errors.some((e) => e.message.includes("Invalid param"));
    expect(hasInvalidParam).toBe(true);
  });
  it("should include NumberValidation for number fields", () => {
    const result = makeValidationComposite(["price"]);
    const errors = result.validate({ price: "not_a_number" });
    const hasInvalidParam = errors.some((e) => e.message.includes("Invalid param"));
    expect(hasInvalidParam).toBe(true);
  });
  it("should include BooleanValidation for boolean fields", () => {
    const result = makeValidationComposite(["canPayWithFidelityPoints"]);
    const errors = result.validate({ canPayWithFidelityPoints: "not_boolean" });
    const hasInvalidParam = errors.some((e) => e.message.includes("Invalid param"));
    expect(hasInvalidParam).toBe(true);
  });
  it("should return no errors for valid input with all field types", () => {
    const result = makeValidationComposite(["name", "email", "password", "passwordConfirmation"]);
    const errors = result.validate({
      name: "Test",
      email: "test@mail.com",
      password: "123456",
      passwordConfirmation: "123456",
    });
    expect(errors).toEqual([]);
  });
  it("should handle empty required fields", () => {
    const result = makeValidationComposite([]);
    const errors = result.validate({});
    expect(errors).toEqual([]);
  });
});
