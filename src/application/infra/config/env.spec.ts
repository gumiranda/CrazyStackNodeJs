describe("env config", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("should export env with default values when no env vars are set", () => {
    // Clear relevant env vars so defaults kick in
    delete process.env.MONGO_URL_PROD;
    delete process.env.JWT_SECRET;
    delete process.env.JWT_REFRESH_SECRET;
    delete process.env.PORT;
    delete process.env.NODE_ENV;
    delete process.env.DATABASE;
    delete process.env.UPLOAD_PROVIDER;
    delete process.env.CLOUDFLARE_R2_ACCOUNT_ID;
    delete process.env.CLOUDFLARE_R2_BUCKET_NAME;
    delete process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    delete process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    delete process.env.FUSORARIOBR;
    delete process.env.PGUSER;
    delete process.env.PGPASSWORD;
    delete process.env.PGHOST;
    delete process.env.PGDATABASE;
    delete process.env.PGPORT;
    delete process.env.DATABASE_URL;

    const { env } = require("./env");
    expect(env).toBeDefined();
    expect(env.mongoUri).toBe("mongodb://127.0.0.1:56328");
    expect(env.jwtSecret).toBe("secret");
    expect(env.jwtRefreshSecret).toBe("secret");
    expect(env.port).toBe(8080);
    expect(env.environment).toBe("development");
    expect(env.uploadProvider).toBe("cloudflare_r2");
    expect(env.database).toBe("mongodb");
  });

  test("should use env vars when they are set", () => {
    process.env.MONGO_URL_PROD = "mongodb://prodhost:27017";
    process.env.JWT_SECRET = "my-jwt-secret";
    process.env.JWT_REFRESH_SECRET = "my-refresh-secret";
    process.env.PORT = "4000";
    process.env.NODE_ENV = "production";
    process.env.DATABASE = "postgres";
    process.env.UPLOAD_PROVIDER = "cloudflare_r2";
    process.env.CLOUDFLARE_R2_ACCOUNT_ID = "cf-account";
    process.env.CLOUDFLARE_R2_BUCKET_NAME = "my-bucket";
    process.env.CLOUDFLARE_R2_ACCESS_KEY_ID = "access-key";
    process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY = "secret-key";

    const { env } = require("./env");
    expect(env.mongoUri).toBe("mongodb://prodhost:27017");
    expect(env.jwtSecret).toBe("my-jwt-secret");
    expect(env.jwtRefreshSecret).toBe("my-refresh-secret");
    expect(env.port).toBe(4000);
    expect(env.environment).toBe("production");
    expect(env.database).toBe("postgres");
  });

  test("should have expected properties in env object", () => {
    const { env } = require("./env");
    expect(env).toHaveProperty("mongoUri");
    expect(env).toHaveProperty("jwtSecret");
    expect(env).toHaveProperty("jwtRefreshSecret");
    expect(env).toHaveProperty("port");
    expect(env).toHaveProperty("environment");
    expect(env).toHaveProperty("uploadProvider");
    expect(env).toHaveProperty("database");
    expect(env).toHaveProperty("cloudflareAccountId");
    expect(env).toHaveProperty("bucketName");
    expect(env).toHaveProperty("awsAccessKeyId");
    expect(env).toHaveProperty("awsSecretAccessKey");
  });

  test("should throw/fail when Zod validation fails with invalid environment value", () => {
    process.env.NODE_ENV = "invalid_environment";
    expect(() => {
      require("./env");
    }).toThrow();
  });

  test("should throw when mongoUri is an invalid URL", () => {
    process.env.MONGO_URL_PROD = "not-a-valid-url";
    expect(() => {
      require("./env");
    }).toThrow();
  });

  test("should export envSchema", () => {
    const { envSchema } = require("./env");
    expect(envSchema).toBeDefined();
    expect(envSchema.parse).toBeDefined();
  });

  test("should throw in production when jwtSecret is default 'secret'", () => {
    process.env.MONGO_URL_PROD = "mongodb://prodhost:27017";
    process.env.JWT_SECRET = "secret";
    process.env.JWT_REFRESH_SECRET = "my-refresh-secret";
    process.env.NODE_ENV = "production";
    expect(() => {
      require("./env");
    }).toThrow(
      "JWT secrets must not use default values in production. Set JWT_SECRET and JWT_REFRESH_SECRET environment variables."
    );
  });

  test("should throw in production when jwtRefreshSecret is default 'secret'", () => {
    process.env.MONGO_URL_PROD = "mongodb://prodhost:27017";
    process.env.JWT_SECRET = "my-jwt-secret";
    process.env.JWT_REFRESH_SECRET = "secret";
    process.env.NODE_ENV = "production";
    expect(() => {
      require("./env");
    }).toThrow(
      "JWT secrets must not use default values in production. Set JWT_SECRET and JWT_REFRESH_SECRET environment variables."
    );
  });

  test("should coerce port to number", () => {
    process.env.PORT = "9999";
    const { env } = require("./env");
    expect(env.port).toBe(9999);
    expect(typeof env.port).toBe("number");
  });

  test("should accept postgres as database value", () => {
    process.env.DATABASE = "postgres";
    const { env } = require("./env");
    expect(env.database).toBe("postgres");
  });

  test("should throw when database value is invalid", () => {
    process.env.DATABASE = "mysql";
    expect(() => {
      require("./env");
    }).toThrow();
  });
});
