import { userBody } from "./userBody";

describe("userBody", () => {
  it("should have email field", () => {
    expect(userBody.email).toBe("gustavoteste41@hotmail.com");
  });
  it("should have name field", () => {
    expect(userBody.name).toBe("Gustavo");
  });
  it("should have role field", () => {
    expect(userBody.role).toBe("client");
  });
  it("should have password field", () => {
    expect(userBody.password).toBe("123456");
  });
  it("should have passwordConfirmation field", () => {
    expect(userBody.passwordConfirmation).toBe("123456");
  });
  it("should have coord as GeoPoint", () => {
    expect(userBody.coord).toEqual({
      type: "Point",
      coordinates: [-46.693419, -23.568704],
    });
  });
  it("should have payDay as a future date", () => {
    expect(userBody.payDay).toBeInstanceOf(Date);
    expect(userBody.payDay.getTime()).toBeGreaterThan(new Date().getTime());
  });
});
