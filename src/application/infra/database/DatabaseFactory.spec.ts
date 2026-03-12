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

import { makeDatabaseInstance } from "./DatabaseFactory";

describe("makeDatabaseInstance", () => {
  it("should return a valid instance", () => {
    const result = makeDatabaseInstance();
    expect(result).toBeDefined();
  });
});
