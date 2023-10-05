export const env = {
  mongoUri: process.env.MONGO_URL_PROD ?? "mongodb://127.0.0.1:56328",
  jwtSecret: process.env.JWT_SECRET ?? "secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "secret",
  port: process.env.PORT ?? 8080,
  environment: process.env.NODE_ENV ?? "development",
  redisPort: process.env.REDIS_PORT ?? 40043,
  redisUrl: process.env.REDIS_URL ?? "us1-active-example-40043.upstash.io",
  redisPassword: process.env.REDIS_PASSWORD ?? "YOUR_PASSWORD",
  googleMapsKey: process.env.GOOGLE_MAPS_API_KEY ?? "YOUR_GOOGLE_MAPS_KEY",
};
