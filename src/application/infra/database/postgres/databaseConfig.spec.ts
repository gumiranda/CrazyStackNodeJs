const mockConnect = jest.fn();
const mockEnd = jest.fn();
const mockOn = jest.fn();
const mockPoolInstance = {
  connect: mockConnect,
  end: mockEnd,
  on: mockOn,
};

jest.mock("pg", () => ({
  Pool: jest.fn(() => mockPoolInstance),
}));

jest.mock("../../config", () => ({
  env: {
    databaseUrl: "postgresql://user:pass@localhost:5432/testdb",
  },
}));

describe("databaseConfig", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create Pool with correct configuration", () => {
    const { Pool } = require("pg");
    // Re-import to trigger Pool creation
    jest.isolateModules(() => {
      require("./databaseConfig");
    });
    expect(Pool).toHaveBeenCalledWith({
      connectionString: "postgresql://user:pass@localhost:5432/testdb",
      ssl: true,
    });
  });

  test("connect should return a client from the pool", async () => {
    const fakeClient = { query: jest.fn(), release: jest.fn() };
    mockConnect.mockResolvedValueOnce(fakeClient);
    const { connect } = require("./databaseConfig");
    const client = await connect();
    expect(client).toBe(fakeClient);
    expect(mockConnect).toHaveBeenCalled();
  });

  test("connect should throw when pool.connect fails", async () => {
    mockConnect.mockRejectedValueOnce(new Error("connection error"));
    const { connect } = require("./databaseConfig");
    await expect(connect()).rejects.toThrow("connection error");
  });

  test("closePool should call pool.end", async () => {
    mockEnd.mockResolvedValueOnce(undefined);
    const { closePool } = require("./databaseConfig");
    await closePool();
    expect(mockEnd).toHaveBeenCalled();
  });

  test("closePool should throw when pool.end fails", async () => {
    mockEnd.mockRejectedValueOnce(new Error("close error"));
    const { closePool } = require("./databaseConfig");
    await expect(closePool()).rejects.toThrow("close error");
  });

  test("should register pool event handlers", () => {
    jest.isolateModules(() => {
      require("./databaseConfig");
    });
    const onCalls = mockOn.mock.calls;
    const eventNames = onCalls.map((call: any) => call[0]);
    expect(eventNames).toContain("error");
    expect(eventNames).toContain("connect");
    expect(eventNames).toContain("remove");
    expect(eventNames).toContain("release");
  });

  test("pool connect handler should log", () => {
    jest.isolateModules(() => {
      require("./databaseConfig");
    });
    const connectHandler = mockOn.mock.calls.find((call: any) => call[0] === "connect")?.[1];
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    connectHandler();
    expect(consoleSpy).toHaveBeenCalledWith("Connected to database");
    consoleSpy.mockRestore();
  });

  test("pool remove handler should log", () => {
    jest.isolateModules(() => {
      require("./databaseConfig");
    });
    const removeHandler = mockOn.mock.calls.find((call: any) => call[0] === "remove")?.[1];
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    removeHandler();
    expect(consoleSpy).toHaveBeenCalledWith("Client removed from pool");
    consoleSpy.mockRestore();
  });

  test("pool release handler should log", () => {
    jest.isolateModules(() => {
      require("./databaseConfig");
    });
    const releaseHandler = mockOn.mock.calls.find((call: any) => call[0] === "release")?.[1];
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    releaseHandler();
    expect(consoleSpy).toHaveBeenCalledWith("Client released from pool");
    consoleSpy.mockRestore();
  });

  test("pool error handler should log error and exit", async () => {
    jest.isolateModules(() => {
      require("./databaseConfig");
    });
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
