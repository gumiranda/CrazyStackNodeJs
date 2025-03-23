import { z } from "zod";

export const envSchema = z.object({
  mongoUri: z
    .string()
    .url({ message: "MONGO_URL inválida" })
    .default("mongodb://127.0.0.1:56328"),
  jwtSecret: z.string().default("secret"),
  jwtRefreshSecret: z.string().default("secret"),
  redisPort: z.coerce.number().optional().default(40043),
  redisUrl: z.string().optional().default("us1-redis-example-40000.upstash.io"),
  redisPassword: z.string().optional(),
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
  googleMapsKey: z.string().default("secret"),
  kafkaUsername: z.string().default("secret"),
  kafkaPassword: z.string().default("secret"),
  kafkaHost: z.string().default("secret"),
  kafkaClientId: z.string().default("secret"),
  pagarmeKeySecret: z.string().default("secret"),
  pagarmeKeyPublic: z.string().default("secret"),
  wooviKey: z.string().default("secret"),
  wooviWebhookKey: z.string().default("secret"),
  stripeKey: z.string().default("secret"),
  stripeKeySecret: z.string().default("secret"),
  database: z.enum(["postgres", "mongodb", "prisma"]).default("mongodb"),
  FUSORARIOBR: z.string().default("production"),
  PGUSER: z.string().default("secret"),
  PGPASSWORD: z.string().default("secret"),
  PGHOST: z.string().default("secret"),
  PGDATABASE: z.string().default("secret"),
  PGPORT: z.string().default("secret"),
  rabbitMqUrl: z.string().default("secret"),
  databaseUrl: z.string().default("secret"),
  messageBroker: z.enum(["kafka", "rabbitmq"]).default("rabbitmq"),
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
  redisPort: process.env.REDIS_PORT ?? 40043,
  redisUrl: process.env.REDIS_URL ?? "us1-active-example-40043.upstash.io",
  redisPassword: process.env.REDIS_PASSWORD ?? "YOUR_PASSWORD",
  googleMapsKey: process.env.GOOGLE_MAPS_API_KEY ?? "YOUR_GOOGLE_MAPS_KEY",
  kafkaUsername: process.env.KAFKA_USERNAME ?? "YOUR_KAFKA_USERNAME",
  kafkaPassword: process.env.KAFKA_PASSWORD ?? "YOUR_KAFKA_PASSWORD",
  kafkaHost: process.env.KAFKA_HOST ?? "YOUR_KAFKA_HOST",
  kafkaClientId: process.env.KAFKA_CLIENT_ID ?? "YOUR_KAFKA_CLIENT_ID",
  pagarmeKeySecret: process.env.PAGARME_SECRET_KEY ?? "YOUR_PAYMENT",
  pagarmeKeyPublic: process.env.PAGARME_PUBLIC_KEY ?? "YOUR_PAYMENT",
  wooviKey: process.env.WOOVI_KEY ?? "YOUR_PAYMENT",
  wooviWebhookKey: process.env.WOOVI_WEBHOOK_SECRET ?? "YOUR_PAYMENT",
  stripeKey: process.env.PUBLIC_STRIPE_KEY ?? "YOUR_PAYMENT",
  stripeKeySecret: process.env.SECRET_STRIPE_KEY ?? "YOUR_PAYMENT",
  database: process.env.DATABASE,
  FUSORARIOBR: process.env.FUSORARIOBR,
  PGPORT: process.env.PGPORT,
  ENDPOINT_ID: process.env.ENDPOINT_ID,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGHOST: process.env.PGHOST,
  rabbitMqUrl: process.env.RABBITMQ_URL,
  messageBroker: process.env.MESSAGE_BROKER ?? "rabbitmq",
  databaseUrl: process.env.DATABASE_URL ?? "",
};

export type EnvInfer = z.infer<typeof envSchema>;

export const env: EnvInfer = envSchema.parse(mappedEnv);
