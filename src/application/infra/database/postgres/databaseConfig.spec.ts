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
});
