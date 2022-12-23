export const env = {
  mongoUri: process.env.MONGO_URL ?? "mongodb://127.0.0.1:56328",
  jwtSecret: process.env.JWT_SECRET ?? "secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "secret",
  port: process.env.PORT ?? 8080,
  environment: process.env.NODE_ENV ?? "development",
};
