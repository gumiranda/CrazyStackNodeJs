import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcryptAdapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hashed_value"));
  },
  async compare(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  },
}));

const salt = 12;

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("Should call encrypt with correct values", async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
    expect(hashSpy).toHaveBeenCalledTimes(1);
  });
  test("Should throw if encrypt throws", async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, "hash").mockRejectedValueOnce(new Error() as never);
    const promise = sut.encrypt("any_value");
    await expect(promise).rejects.toThrow();
  });
  test("should return a hash on success", async () => {
    const sut = makeSut();
    const isValid = await sut.encrypt("any_value");
    expect(isValid).toBe("hashed_value");
  });
  test("Should call compare with correct values", async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, "compare");
    await sut.compare("any_value", "any_hash");
    expect(hashSpy).toHaveBeenCalledWith("any_value", "any_hash");
    expect(hashSpy).toHaveBeenCalledTimes(1);
  });
  test("Should throw if compare throws", async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, "compare").mockRejectedValueOnce(new Error() as never);
    const promise = sut.compare("any_value", "any_hash");
    await expect(promise).rejects.toThrow();
  });
  test("should return a compare true on success", async () => {
    const sut = makeSut();
    const isValid = await sut.compare("any_value", "any_hash");
    expect(isValid).toBe(true);
  });
  test("should return false in wrong compare", async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);
    const isValid = await sut.compare("any_value", "any_hash");
    expect(isValid).toBe(false);
  });
});
