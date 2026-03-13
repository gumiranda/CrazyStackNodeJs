import { describe, test, expect, beforeEach, jest, mock } from "bun:test";
const mockConnect = jest.fn();
const mockEnd = jest.fn();
const mockOn = jest.fn();
const mockPoolInstance = {
  connect: mockConnect,
  end: mockEnd,
  on: mockOn,
};
const MockPool = jest.fn(() => mockPoolInstance);

mock.module("pg", () => ({
  Pool: MockPool,
}));

mock.module("../../config", () => ({
  env: {
    databaseUrl: "postgresql://user:pass@localhost:5432/testdb",
    environment: "development",
  },
}));

const { connect, closePool } = require("./databaseConfig");

describe("databaseConfig", () => {
  test("should create Pool with correct configuration", () => {
    expect(MockPool).toHaveBeenCalledWith({
      connectionString: "postgresql://user:pass@localhost:5432/testdb",
      ssl: true,
    });
  });

  test("connect should return a client from the pool", async () => {
    const fakeClient = { query: jest.fn(), release: jest.fn() };
    mockConnect.mockResolvedValueOnce(fakeClient);
    const client = await connect();
    expect(client).toBe(fakeClient);
    expect(mockConnect).toHaveBeenCalled();
  });

  test("connect should throw when pool.connect fails", async () => {
    mockConnect.mockRejectedValueOnce(new Error("connection error"));
    await expect(connect()).rejects.toThrow("connection error");
  });

  test("closePool should call pool.end", async () => {
    mockEnd.mockResolvedValueOnce(undefined);
    await closePool();
    expect(mockEnd).toHaveBeenCalled();
  });

  test("closePool should throw when pool.end fails", async () => {
    mockEnd.mockRejectedValueOnce(new Error("close error"));
    await expect(closePool()).rejects.toThrow("close error");
  });

  test("should register pool event handlers", () => {
    const onCalls = mockOn.mock.calls;
    const eventNames = onCalls.map((call: any) => call[0]);
    expect(eventNames).toContain("error");
    expect(eventNames).toContain("connect");
    expect(eventNames).toContain("remove");
    expect(eventNames).toContain("release");
  });

  test("pool connect handler should log", () => {
    const connectHandler = mockOn.mock.calls.find((call: any) => call[0] === "connect")?.[1];
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    connectHandler();
    expect(consoleSpy).toHaveBeenCalledWith("Connected to database");
    consoleSpy.mockRestore();
  });

  test("pool remove handler should log", () => {
    const removeHandler = mockOn.mock.calls.find((call: any) => call[0] === "remove")?.[1];
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    removeHandler();
    expect(consoleSpy).toHaveBeenCalledWith("Client removed from pool");
    consoleSpy.mockRestore();
  });

  test("pool release handler should log", () => {
    const releaseHandler = mockOn.mock.calls.find((call: any) => call[0] === "release")?.[1];
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    releaseHandler();
    expect(consoleSpy).toHaveBeenCalledWith("Client released from pool");
    consoleSpy.mockRestore();
  });

  test("pool error handler should log error and exit", async () => {
    const errorHandler = mockOn.mock.calls.find((call: any) => call[0] === "error")?.[1];
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => undefined as never);
    mockEnd.mockResolvedValueOnce(undefined);
    await errorHandler(new Error("idle error"));
    expect(consoleSpy).toHaveBeenCalledWith("Unexpected error on idle client", expect.any(Error));
    expect(exitSpy).toHaveBeenCalledWith(-1);
    consoleSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
