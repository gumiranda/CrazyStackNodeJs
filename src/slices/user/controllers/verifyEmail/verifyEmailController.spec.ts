import { describe, it, expect, beforeEach, jest } from "bun:test";
import { mock, MockProxy } from "jest-mock-extended";
import { VerifyEmailController } from "./verifyEmailController";
import { Controller } from "@/application/infra/contracts";
import { Validation, badRequest, forbidden, ok } from "@/application/helpers";
import { InvalidParamError, MissingParamError } from "@/application/errors";

describe("VerifyEmailController", () => {
  let sut: VerifyEmailController;
  let validation: MockProxy<Validation>;
  let updateUser: jest.Mock;
  let loadUser: jest.Mock;

  const fakeBody = { email: "test@mail.com", code: "valid_token" };
  const fakeUser = { _id: "any_id", email: "test@mail.com", token: "valid_token" };

  beforeEach(() => {
    jest.clearAllMocks();
    validation = mock();
    validation.validate.mockReturnValue([]);
    updateUser = jest.fn().mockResolvedValue({ _id: "any_id", confirmedEmail: true });
    loadUser = jest.fn().mockResolvedValue(fakeUser);
    sut = new VerifyEmailController(validation, updateUser, loadUser);
  });

  it("should extend Controller", () => {
    expect(sut).toBeInstanceOf(Controller);
  });
  it("should return badRequest if validation fails", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("email")]);
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(badRequest([new MissingParamError("email")]));
  });
  it("should return forbidden if user is not found", async () => {
    loadUser.mockResolvedValueOnce(null);
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(forbidden(new InvalidParamError("email")));
  });
  it("should return forbidden if token does not match", async () => {
    loadUser.mockResolvedValueOnce({ ...fakeUser, token: "different_token" });
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(forbidden(new InvalidParamError("code")));
  });
  it("should call updateUser with correct params", async () => {
    await sut.execute({ body: fakeBody });
    expect(updateUser).toHaveBeenCalledWith(
      { fields: { _id: "any_id" } },
      { token: null, confirmedEmail: true }
    );
  });
  it("should return forbidden if updateUser returns null", async () => {
    updateUser.mockResolvedValueOnce(null);
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(forbidden(new InvalidParamError("code")));
  });
  it("should return ok on success", async () => {
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(ok({ message: "Email verified" }));
  });
});
