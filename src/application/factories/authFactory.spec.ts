jest.mock("@/application/infra", () => ({
  BcryptAdapter: jest.fn().mockImplementation(() => ({
    compare: jest.fn(),
    encrypt: jest.fn(),
  })),
  JwtAdapter: jest.fn().mockImplementation(() => ({
    generate: jest.fn(),
    decrypt: jest.fn(),
  })),
  makeDatabaseInstance: jest.fn().mockReturnValue({
    add: jest.fn(),
    getOne: jest.fn(),
    update: jest.fn(),
    getPaginate: jest.fn(),
    getCount: jest.fn(),
    deleteOne: jest.fn(),
    aggregate: jest.fn(),
    increment: jest.fn(),
  }),
  env: { jwtSecret: "secret", jwtRefreshSecret: "refresh_secret" },
}));
jest.mock("@/application/infra/config/whiteLabel", () => ({
  whiteLabel: { database: "mongodb" },
}));

import { makeDbAuthentication } from "./authFactory";

describe("makeDbAuthentication", () => {
  it("should return an Authentication instance", () => {
    const result = makeDbAuthentication();
    expect(result).toBeDefined();
    expect(result.auth).toBeDefined();
    expect(result.authRefreshToken).toBeDefined();
  });
});
