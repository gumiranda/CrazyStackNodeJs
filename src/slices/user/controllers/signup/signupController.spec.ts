import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { SignupController } from "./signupController";
import { Controller } from "@/application/infra/contracts";
import {
  Validation,
  Authentication,
  badRequest,
  forbidden,
  unauthorized,
  ok,
} from "@/application/helpers";
import { EmailInUseError, InvalidParamError, MissingParamError } from "@/application/errors";

jest.mock("deep-email-validator", () =>
  jest.fn().mockResolvedValue({
    validators: {
      regex: { valid: true },
      typo: { valid: true },
      disposable: { valid: true },
      smtp: { valid: true },
      mx: { valid: true },
    },
  })
);
jest.mock("slug", () => jest.fn().mockReturnValue("any-slug"));
jest.mock("@/application/helpers/utils/generateToken", () => ({
  generateToken: jest.fn().mockReturnValue("any_token"),
}));

describe("SignupController", () => {
  let sut: SignupController;
  let validation: MockProxy<Validation>;
  let addUser: jest.Mock;
  let loadUser: jest.Mock;
  let authentication: MockProxy<Authentication>;
  let completeOwner: jest.Mock;

  const fakeBody = {
    name: "Test User",
    email: "test@mail.com",
    password: "123456",
    passwordConfirmation: "123456",
    role: "client",
  };
  const fakeUser = { _id: "any_id", name: "Test User", email: "test@mail.com" };

  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    validation = mock();
    validation.validate.mockReturnValue([]);
    addUser = jest.fn().mockResolvedValue(fakeUser);
    loadUser = jest.fn().mockResolvedValue(null);
    authentication = mock();
    authentication.auth.mockResolvedValue({
      accessToken: "any_access_token",
      refreshToken: "any_refresh_token",
    });
    completeOwner = jest.fn().mockResolvedValue({});
    sut = new SignupController(validation, addUser, loadUser, authentication, completeOwner);
  });

  it("should extend Controller", () => {
    expect(sut).toBeInstanceOf(Controller);
  });
  it("should return badRequest if validation fails", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(badRequest([new MissingParamError("name")]));
  });
  it("should call validation with correct params", async () => {
    await sut.execute({ body: fakeBody });
    expect(validation.validate).toHaveBeenCalledWith(fakeBody);
  });
  it("should return badRequest if email validator fails (regex invalid)", async () => {
    const emailValidator = require("deep-email-validator");
    emailValidator.mockResolvedValueOnce({
      validators: {
        regex: { valid: false },
        typo: { valid: true },
        disposable: { valid: true },
        smtp: { valid: true },
        mx: { valid: true },
      },
    });
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(badRequest([new InvalidParamError("email")]));
  });
  it("should return forbidden if user already exists", async () => {
    loadUser.mockResolvedValueOnce(fakeUser);
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(forbidden(new EmailInUseError()));
  });
  it("should call addUser with slug and token", async () => {
    await sut.execute({ body: { ...fakeBody } });
    expect(addUser).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: "any-slug",
        token: "any_token",
      })
    );
  });
  it("should return unauthorized if auth fails", async () => {
    authentication.auth.mockResolvedValueOnce(null);
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(unauthorized());
  });
  it("should call completeOwner when role is owner", async () => {
    const ownerBody = { ...fakeBody, role: "owner" };
    await sut.execute({ body: ownerBody });
    expect(completeOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: "any_id",
        email: "test@mail.com",
      })
    );
  });
  it("should not call completeOwner when role is not owner", async () => {
    await sut.execute({ body: fakeBody });
    expect(completeOwner).not.toHaveBeenCalled();
  });
  it("should return ok with user, accessToken and refreshToken on success", async () => {
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(
      ok({
        user: fakeUser,
        accessToken: "any_access_token",
        refreshToken: "any_refresh_token",
      })
    );
  });
  it("should regenerate slug if it already exists", async () => {
    loadUser
      .mockResolvedValueOnce(null) // email check
      .mockResolvedValueOnce({ _id: "existing" }) // first slug check
      .mockResolvedValueOnce(null); // second slug check
    await sut.execute({ body: fakeBody });
    expect(loadUser).toHaveBeenCalledTimes(3);
  });
  it("should check cpf if provided", async () => {
    const bodyWithCpf = { ...fakeBody, cpf: "12345678900" };
    await sut.execute({ body: bodyWithCpf });
    expect(loadUser).toHaveBeenCalledWith(
      expect.objectContaining({ fields: { cpf: "12345678900" } })
    );
  });
  it("should check cnpj if provided", async () => {
    const bodyWithCnpj = { ...fakeBody, cnpj: "12345678000100" };
    await sut.execute({ body: bodyWithCnpj });
    expect(loadUser).toHaveBeenCalledWith(
      expect.objectContaining({ fields: { cnpj: "12345678000100" } })
    );
  });
  it("should return badRequest if smtp is invalid and reason is not Timeout", async () => {
    const emailValidator = require("deep-email-validator");
    emailValidator.mockResolvedValueOnce({
      validators: {
        regex: { valid: true },
        typo: { valid: true },
        disposable: { valid: true },
        smtp: { valid: false, reason: "Invalid" },
        mx: { valid: true },
      },
    });
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(badRequest([new InvalidParamError("email")]));
  });
  it("should not return badRequest if smtp is invalid but reason is Timeout", async () => {
    const emailValidator = require("deep-email-validator");
    emailValidator.mockResolvedValueOnce({
      validators: {
        regex: { valid: true },
        typo: { valid: true },
        disposable: { valid: true },
        smtp: { valid: false, reason: "Timeout" },
        mx: { valid: true },
      },
    });
    const result = await sut.execute({ body: fakeBody });
    expect(result).not.toEqual(badRequest([new InvalidParamError("email")]));
  });
});
