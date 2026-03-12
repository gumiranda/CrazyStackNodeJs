import { generateToken } from "./generateToken";

describe("generateToken", () => {
  it("should return a hex string", () => {
    const token = generateToken();
    expect(token).toMatch(/^[0-9a-f]+$/);
  });
  it("should return a 128 character string (64 bytes as hex)", () => {
    const token = generateToken();
    expect(token).toHaveLength(128);
  });
  it("should return unique tokens on each call", () => {
    const token1 = generateToken();
    const token2 = generateToken();
    expect(token1).not.toBe(token2);
  });
  it("should return a string type", () => {
    const token = generateToken();
    expect(typeof token).toBe("string");
  });
});
