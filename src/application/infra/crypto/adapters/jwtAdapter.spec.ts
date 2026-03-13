import { describe, test, expect } from "bun:test";
import { JwtAdapter } from "./jwtAdapter";

const makeSut = (): JwtAdapter => {
  return new JwtAdapter("secret", "1d");
};

describe("jwtAdapter", () => {
  describe("constructor", () => {
    test("Should create an instance with given secret and expiration", () => {
      const sut = new JwtAdapter("my_secret", "2h");
      expect(sut).toBeDefined();
    });
  });
  describe("generate()", () => {
    test("Should return a token on generate success", async () => {
      const sut = makeSut();
      const token = await sut.generate("any_id");
      expect(token).toBeTruthy();
      expect(typeof token).toBe("string");
    });
    test("Should generate different tokens for different ids", async () => {
      const sut = makeSut();
      const token1 = await sut.generate("id_1");
      const token2 = await sut.generate("id_2");
      expect(token1).not.toBe(token2);
    });
  });
  describe("decrypt()", () => {
    test("Should return decoded payload on decrypt success", async () => {
      const sut = makeSut();
      const token = await sut.generate("any_id");
      const decoded: any = await sut.decrypt(token);
      expect(decoded._id).toBe("any_id");
    });
    test("Should throw if token is invalid", async () => {
      const sut = makeSut();
      const promise = sut.decrypt("invalid_token");
      await expect(promise).rejects.toThrow();
    });
    test("Should throw if token was signed with different secret", async () => {
      const sut1 = new JwtAdapter("secret1", "1d");
      const sut2 = new JwtAdapter("secret2", "1d");
      const token = await sut1.generate("any_id");
      const promise = sut2.decrypt(token);
      await expect(promise).rejects.toThrow();
    });
  });
});
