jest.mock("@/application/adapters", () => ({
  adaptRoute: jest.fn(() => jest.fn()),
}));
jest.mock("@/application/adapters/middleware-adapter", () => ({
  adaptMiddleware: jest.fn(() => jest.fn()),
}));
jest.mock("@/slices/owner/controllers", () => ({
  makeLoadOwnerController: jest.fn(),
  makeLoadOwnerByPageController: jest.fn(),
}));
jest.mock("@/slices/service/controllers", () => ({
  makeLoadServiceByPageController: jest.fn(),
}));
jest.mock("@/slices/user/controllers", () => ({
  makeLoadUserByPageController: jest.fn(),
}));

import { publica } from "./publicRouter";

describe("publicRouter", () => {
  const mockFastify = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    addHook: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not register a preHandler hook (public routes have no auth)", async () => {
    await publica(mockFastify as any);
    expect(mockFastify.addHook).not.toHaveBeenCalled();
  });

  it("should register GET /public/user/loadByPage route", async () => {
    await publica(mockFastify as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/public/user/loadByPage",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /public/owner/load route", async () => {
    await publica(mockFastify as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/public/owner/load",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /public/owner/loadByPage route", async () => {
    await publica(mockFastify as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/public/owner/loadByPage",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register GET /public/service/loadByPage route", async () => {
    await publica(mockFastify as any);
    expect(mockFastify.get).toHaveBeenCalledWith(
      "/public/service/loadByPage",
      expect.anything(),
      expect.any(Function)
    );
  });

  it("should register the correct number of routes", async () => {
    await publica(mockFastify as any);
    expect(mockFastify.get).toHaveBeenCalledTimes(4);
    expect(mockFastify.post).not.toHaveBeenCalled();
    expect(mockFastify.delete).not.toHaveBeenCalled();
    expect(mockFastify.patch).not.toHaveBeenCalled();
  });
});
