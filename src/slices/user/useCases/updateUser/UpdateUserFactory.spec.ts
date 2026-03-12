jest.mock("@/application/infra", () => ({
  makeDatabaseInstance: jest.fn().mockReturnValue({
    add: jest.fn(), getOne: jest.fn(), update: jest.fn(),
    getPaginate: jest.fn(), getCount: jest.fn(), deleteOne: jest.fn(),
    aggregate: jest.fn(), increment: jest.fn(),
  }),
  env: { jwtSecret: "secret", jwtRefreshSecret: "secret", uploadProvider: "cloudflare_r2" },
  BcryptAdapter: jest.fn().mockImplementation(() => ({ compare: jest.fn(), encrypt: jest.fn() })),
  JwtAdapter: jest.fn().mockImplementation(() => ({ generate: jest.fn(), decrypt: jest.fn() })),
}));
jest.mock("@/application/infra/config/whiteLabel", () => ({
  whiteLabel: { database: "mongodb", systemName: "Test", categories: [{ name: "Cat", description: "D", services: [{ name: "S", description: "D", price: 50, comission: 50, duration: 30 }] }] },
}));

import { makeUpdateUserFactory } from "./UpdateUserFactory";

describe("makeUpdateUserFactory", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateUserFactory();
    expect(result).toBeDefined();
  });
});
