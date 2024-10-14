-- AlterTable
ALTER TABLE "account" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "appointment" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "charge" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "client" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "fidelity" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "mapRoute" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "owner" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "photo" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "rating" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "ratingResult" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "recurrence" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "request" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "ride" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "routeDriver" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "service" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "subscription" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "_id" SET DEFAULT uuid_generate_v4();
