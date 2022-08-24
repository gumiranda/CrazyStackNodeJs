export const env = {
  mongoUri: process.env.MONGO_URL ?? "mongodb://127.0.0.1:56328",
  jwtSecret: process.env.JWT_SECRET ?? "secret",
};
