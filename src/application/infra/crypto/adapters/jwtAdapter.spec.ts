import jwt from "jsonwebtoken";
import { JwtAdapter } from "./jwtAdapter";
jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return new Promise((resolve) => resolve("any_token"));
  },
  async verify(): Promise<string> {
    return new Promise((resolve) => resolve("any_value"));
  },
}));

const makeSut = (): JwtAdapter => {
  return new JwtAdapter("secret", "1d");
};

describe("jwtAdapter", () => {
  describe("sign()", () => {
    test("Should call sign with correct values", async () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, "sign");
      await sut.generate("any_id");
      expect(signSpy).toHaveBeenCalledWith({ _id: "any_id" }, "secret", {
        expiresIn: "1d",
      });
      expect(signSpy).toHaveBeenCalledTimes(1);
    });
    test("should return a token on sign success", async () => {
      const sut = makeSut();
      const accessToken = await sut.generate("any_id");
      expect(accessToken).toBe("any_token");
    });
    test("should throw if sign throws", async () => {
      const sut = makeSut();
      jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.generate("any_id");
      await expect(promise).rejects.toThrow();
    });
  });
  describe("verify()", () => {
    test("Should call verify with correct values", async () => {
      const sut = makeSut();
      const verifySpy = jest.spyOn(jwt, "verify");
      await sut.decrypt("any_token");
      expect(verifySpy).toHaveBeenCalledWith("any_token", "secret");
      expect(verifySpy).toHaveBeenCalledTimes(1);
    });
    test("should return a token on verify success", async () => {
      const sut = makeSut();
      const accessToken = await sut.decrypt("any_token");
      expect(accessToken).toBe("any_value");
    });
    test("should throw if verify throws", async () => {
      const sut = makeSut();
      jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.decrypt("any_token");
      await expect(promise).rejects.toThrow();
    });
  });
});
