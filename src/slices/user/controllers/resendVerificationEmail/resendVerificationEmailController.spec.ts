import { mock, MockProxy } from "jest-mock-extended";
import { ResendVerificationEmailController } from "./resendVerificationEmailController";
import { Controller } from "@/application/infra/contracts";
import { Validation, badRequest, forbidden, ok } from "@/application/helpers";
import { InvalidParamError, MissingParamError } from "@/application/errors";

jest.mock("@/application/helpers/utils/generateToken", () => ({
  generateToken: jest.fn().mockReturnValue("generated_token"),
}));

describe("ResendVerificationEmailController", () => {
  let sut: ResendVerificationEmailController;
  let validation: MockProxy<Validation>;
  let updateUser: jest.Mock;

  const fakeBody = { email: "test@mail.com" };

  beforeEach(() => {
    validation = mock();
    validation.validate.mockReturnValue([]);
    updateUser = jest.fn().mockResolvedValue({ _id: "any_id" });
    sut = new ResendVerificationEmailController(validation, updateUser);
  });

  it("should extend Controller", () => {
    expect(sut).toBeInstanceOf(Controller);
  });
  it("should return badRequest if validation fails", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("email")]);
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(badRequest([new MissingParamError("email")]));
  });
  it("should call updateUser with email and token", async () => {
    await sut.execute({ body: fakeBody });
    expect(updateUser).toHaveBeenCalledWith(
      { fields: { email: "test@mail.com" } },
      { token: "generated_token" }
    );
  });
  it("should return forbidden if updateUser returns null", async () => {
    updateUser.mockResolvedValueOnce(null);
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(forbidden(new InvalidParamError("email")));
  });
  it("should return ok on success", async () => {
    const result = await sut.execute({ body: fakeBody });
    expect(result).toEqual(ok({ message: "Email sent successfully" }));
  });
});
