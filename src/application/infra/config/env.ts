import { z } from "zod";

export const envSchema = z.object({
  mongoUri: z
    .string()
    .url({ message: "MONGO_URL inválida" })
    .default("mongodb://127.0.0.1:56328"),
  jwtSecret: z.string().default("secret"),
  jwtRefreshSecret: z.string().default("secret"),
  cloudflareAccountId: z.string().default("secret"),
  bucketName: z.string().default("teste"),
  awsAccessKeyId: z.string().default("secret"),
  awsSecretAccessKey: z.string().default("secret"),
  port: z.coerce.number().optional().default(3000),
  environment: z
    .enum(["development", "test", "production"], {
      errorMap: () => ({ message: "O ambiente deve ser development, test ou production" }),
    })
    .default("development"),
  uploadProvider: z.enum(["cloudflare_r2"]).default("cloudflare_r2"),
  database: z.enum(["postgres", "mongodb", "prisma"]).default("mongodb"),
  FUSORARIOBR: z.string().default("production"),
  PGUSER: z.string().default("secret"),
  PGPASSWORD: z.string().default("secret"),
  PGHOST: z.string().default("secret"),
  PGDATABASE: z.string().default("secret"),
  PGPORT: z.string().default("secret"),
  databaseUrl: z.string().default("secret"),
});

const mappedEnv = {
  uploadProvider: process.env.UPLOAD_PROVIDER ?? "cloudflare_r2",
  cloudflareAccountId: process.env.CLOUDFLARE_R2_ACCOUNT_ID,
  bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME,
  awsAccessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  mongoUri: process.env.MONGO_URL_PROD ?? "mongodb://127.0.0.1:56328",
  jwtSecret: process.env.JWT_SECRET ?? "secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "secret",
  port: process.env.PORT ?? 8080,
  environment: process.env.NODE_ENV ?? "development",
  database: process.env.DATABASE,
  FUSORARIOBR: process.env.FUSORARIOBR,
  PGPORT: process.env.PGPORT,
  ENDPOINT_ID: process.env.ENDPOINT_ID,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGHOST: process.env.PGHOST,
  databaseUrl: process.env.DATABASE_URL ?? "",
};

export type EnvInfer = z.infer<typeof envSchema>;

export const env: EnvInfer = envSchema.parse(mappedEnv);
