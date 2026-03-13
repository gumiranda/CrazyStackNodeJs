import { describe, test, expect } from "bun:test";
import { BcryptAdapter } from "./bcryptAdapter";

const salt = 12;

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("Should create an instance with given salt", () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
  test("Should return a hashed value on encrypt", async () => {
    const sut = makeSut();
    const hash = await sut.encrypt("any_value");
    expect(hash).toBeTruthy();
    expect(hash).not.toBe("any_value");
  });
  test("Should return true when comparing correct password", async () => {
    const sut = makeSut();
    const hash = await sut.encrypt("any_value");
    const isValid = await sut.compare("any_value", hash);
    expect(isValid).toBe(true);
  });
  test("Should return false when comparing wrong password", async () => {
    const sut = makeSut();
    const hash = await sut.encrypt("any_value");
    const isValid = await sut.compare("wrong_value", hash);
    expect(isValid).toBe(false);
  });
});
