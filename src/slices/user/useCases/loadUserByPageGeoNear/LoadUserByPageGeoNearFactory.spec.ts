jest.mock("@/application/infra/config/whiteLabel", () => ({
  whiteLabel: { database: "mongodb", systemName: "Test", categories: [{ name: "Cat", description: "D", services: [{ name: "S", description: "D", price: 50, comission: 50, duration: 30 }] }] },
}));

import { makeLoadUserByPageGeoNearFactory } from "./LoadUserByPageGeoNearFactory";

describe("makeLoadUserByPageGeoNearFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserByPageGeoNearFactory();
    expect(result).toBeDefined();
  });
});
