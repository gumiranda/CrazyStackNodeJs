jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));
jest.mock("@/application/infra", () => ({
  makeDatabaseInstance: jest.fn().mockReturnValue({
    add: jest.fn(), getOne: jest.fn(), update: jest.fn(),
    getPaginate: jest.fn(), getCount: jest.fn(), deleteOne: jest.fn(),
    aggregate: jest.fn(), increment: jest.fn(),
  }),
  env: { jwtSecret: "secret", jwtRefreshSecret: "refresh_secret", uploadProvider: "cloudflare_r2" },
  BcryptAdapter: jest.fn().mockImplementation(() => ({ compare: jest.fn(), encrypt: jest.fn() })),
  JwtAdapter: jest.fn().mockImplementation(() => ({ generate: jest.fn(), decrypt: jest.fn() })),
}));
jest.mock("@/application/infra/config/whiteLabel", () => ({
  whiteLabel: { database: "mongodb", systemName: "Test", categories: [{ name: "Cat", description: "D", services: [{ name: "S", description: "D", price: 50, comission: 50, duration: 30 }] }] },
}));
jest.mock("@/application/infra/config/env", () => ({
  env: { database: "mongodb" },
}));
jest.mock("@/application/infra/storage/storageFactory", () => ({
  makeUploadProvider: jest.fn().mockReturnValue({ uploadFile: jest.fn(), delete: jest.fn() }),
}));

import { makeLogController } from "./decorators/logControllerFactory";
import { makeDbAuthentication } from "./factories/authFactory";
import { makeValidationComposite } from "./factories/validationFactory";
import { ValidationComposite } from "@/application/helpers/validation/validation-composite";
import { makeDatabaseInstance } from "./infra/database/DatabaseFactory";
import { makeAuthMiddleware } from "./infra/middlewares/auth/authMiddlewareFactory";
import { makeRefreshTokenMiddleware } from "./infra/middlewares/refreshToken/refreshTokenMiddlewareFactory";
import { makeUploadProvider } from "./infra/storage/storageFactory";

describe("makeLogController", () => {
  it("should return a valid instance", () => {
    const result = makeLogController();
    expect(result).toBeDefined();
  });
});

describe("makeDbAuthentication", () => {
  it("should return an Authentication instance", () => {
    const result = makeDbAuthentication();
    expect(result).toBeDefined();
    expect(result.auth).toBeDefined();
    expect(result.authRefreshToken).toBeDefined();
  });
});

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

describe("makeDatabaseInstance", () => {
  it("should return a valid instance", () => {
    const result = makeDatabaseInstance();
    expect(result).toBeDefined();
  });
});

describe("makeAuthMiddleware", () => {
  it("should return a valid instance", () => {
    const result = makeAuthMiddleware();
    expect(result).toBeDefined();
  });
});

describe("makeRefreshTokenMiddleware", () => {
  it("should return a valid instance", () => {
    const result = makeRefreshTokenMiddleware();
    expect(result).toBeDefined();
  });
});

describe("makeUploadProvider", () => {
  it("should return a valid instance", () => {
    const result = makeUploadProvider();
    expect(result).toBeDefined();
  });
});
