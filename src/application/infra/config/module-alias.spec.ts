const mockAddAlias = jest.fn();
jest.mock("module-alias", () => ({
  addAlias: mockAddAlias,
}));

describe("module-alias", () => {
  afterEach(() => {
    jest.resetModules();
    mockAddAlias.mockClear();
  });

  it("should call addAlias with 'src' when TS_NODE_ENV is defined", () => {
    process.env.TS_NODE_ENV = "true";
    jest.isolateModules(() => {
      require("./module-alias");
    });
    expect(mockAddAlias).toHaveBeenCalledWith("@", expect.stringContaining("src"));
    delete process.env.TS_NODE_ENV;
  });

  it("should call addAlias with 'dist' when TS_NODE_ENV is undefined", () => {
    delete process.env.TS_NODE_ENV;
    jest.isolateModules(() => {
      require("./module-alias");
    });
    expect(mockAddAlias).toHaveBeenCalledWith("@", expect.stringContaining("dist"));
  });
});
