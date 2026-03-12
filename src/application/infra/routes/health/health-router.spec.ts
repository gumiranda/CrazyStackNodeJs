import { health } from "./health-router";

describe("healthRouter", () => {
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

  it("should register GET / route", async () => {
    await health(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledWith("/", expect.any(Function));
  });

  it("should register exactly one route", async () => {
    await health(mockFastify as any, {} as any);
    expect(mockFastify.get).toHaveBeenCalledTimes(1);
    expect(mockFastify.post).not.toHaveBeenCalled();
    expect(mockFastify.delete).not.toHaveBeenCalled();
    expect(mockFastify.patch).not.toHaveBeenCalled();
  });

  it("should not register any auth hooks", async () => {
    await health(mockFastify as any, {} as any);
    expect(mockFastify.addHook).not.toHaveBeenCalled();
  });

  it("should return { hello: 'world' } when the handler is called", async () => {
    await health(mockFastify as any, {} as any);
    const handler = mockFastify.get.mock.calls[0][1];
    const result = await handler({}, {});
    expect(result).toEqual({ hello: "world" });
  });
});
