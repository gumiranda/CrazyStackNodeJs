CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "confirmedEmail" BOOLEAN DEFAULT FALSE,
    "sendedEmail" BOOLEAN DEFAULT FALSE,
    "password" VARCHAR(255) NOT NULL,
    "cardId" UUID,
    "ownerId" UUID,
    "myOwnerId" UUID,
    "payDay" VARCHAR(255),
    "photoUrl" VARCHAR(255),
    "cpf" VARCHAR(255),
    "phone" VARCHAR(255),
    "coord" JSONB,
    "distance" NUMERIC,
    "appointmentsTotal" INT DEFAULT 0,
    "plan" VARCHAR(255),
    "cnpj" VARCHAR(255),
    "city" VARCHAR(255),
    "uf" VARCHAR(255),
    "address" TEXT,
    "complement" TEXT,
    "photoId" UUID,
    "cash" BOOLEAN DEFAULT FALSE,
    "creditcard" BOOLEAN DEFAULT FALSE,
    "debitcard" BOOLEAN DEFAULT FALSE,
    "transferbank" BOOLEAN DEFAULT FALSE,
    "cheque" BOOLEAN DEFAULT FALSE,
    "pix" BOOLEAN DEFAULT FALSE,
    "nextPlan" VARCHAR(255),
    "addresses" JSONB,
    "clientId" UUID,
    "active" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "serviceIds" VARCHAR(255)[],
    "serviceOptions" JSONB[],
    "globalID" UUID
);

CREATE TABLE category (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "description" TEXT,
    "image" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("createdById") REFERENCES users("_id")
);

CREATE TABLE service (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "categoryId" UUID NOT NULL,
    "duration" INT NOT NULL,
    "description" TEXT,
    "productsQuantityNeeded" INT,
    "productId" UUID,
    "promotionalPrice" NUMERIC,
    "price" NUMERIC,
    "finalPrice" NUMERIC,
    "commission" NUMERIC,
    "havePromotionalPrice" BOOLEAN,
    "hasFidelityGenerator" BOOLEAN,
    "generateHowManyPoints" INT,
    "appointmentsTotal" INT DEFAULT 0,
    "canPayWithFidelityPoints" BOOLEAN,
    "howManyPointsIsNeededToRescue" INT,
    FOREIGN KEY ("createdById") REFERENCES users("_id"),
    FOREIGN KEY ("categoryId") REFERENCES category("_id")
);

CREATE TABLE owner (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "appointmentsTotal" INT DEFAULT 0,
    "ratingsTotal" INT DEFAULT 0,
    "haveDelivery" BOOLEAN,
    "typeTax" VARCHAR(50) CHECK ("typeTax" IN ('fixed', 'bytime')),
    "costByTimeDriving" NUMERIC,
    "fidelityTaxPoints" NUMERIC,
    "fixedTax" NUMERIC,
    "minimumTimeForReSchedule" INT,
    "description" TEXT,
    "days1" JSONB,
    "days2" JSONB,
    "hourStart1" VARCHAR(10),
    "hourStart2" VARCHAR(10),
    "hourEnd1" VARCHAR(10),
    "hourEnd2" VARCHAR(10),
    "hourLunchStart1" VARCHAR(10),
    "hourLunchEnd1" VARCHAR(10),
    "hourLunchStart2" VARCHAR(10),
    "hourLunchEnd2" VARCHAR(10),
    "days3" JSONB,
    "days4" JSONB,
    "hourStart3" VARCHAR(10),
    "hourStart4" VARCHAR(10),
    "hourEnd3" VARCHAR(10),
    "hourEnd4" VARCHAR(10),
    "hourLunchStart3" VARCHAR(10),
    "hourLunchEnd3" VARCHAR(10),
    "hourLunchStart4" VARCHAR(10),
    "hourLunchEnd4" VARCHAR(10),
    CONSTRAINT "check_minimumTimeForReSchedule" CHECK ("minimumTimeForReSchedule" >= 0),
    CONSTRAINT "check_costByTimeDriving" CHECK ("costByTimeDriving" >= 0),
    CONSTRAINT "check_fidelityTaxPoints" CHECK ("fidelityTaxPoints" >= 0 AND "fidelityTaxPoints" <= 100),
    CONSTRAINT "check_fixedTax" CHECK ("fixedTax" >= 0),
    FOREIGN KEY ("createdById") REFERENCES users("_id")
);

CREATE TABLE client (
    "_id" UUID PRIMARY KEY,
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "cpf" VARCHAR(14),
    "phone" VARCHAR(15),
    "userId" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "birthDate" DATE,
    "appointmentsTotal" INT,
    "myOwnerId" UUID,
    FOREIGN KEY ("createdById") REFERENCES users("_id"),
    FOREIGN KEY ("userId") REFERENCES users("_id"),
    FOREIGN KEY ("ownerId") REFERENCES owner("_id"),
    FOREIGN KEY ("myOwnerId") REFERENCES owner("_id")
);

CREATE TABLE request (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "serviceId" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "clientUserId" UUID,
    "professionalId" UUID NOT NULL,
    "status" INT NOT NULL,
    "createdForId" UUID NOT NULL,
    "updatedById" UUID,
    "updatedByRole" VARCHAR(255),
    "read" BOOLEAN NOT NULL,
    "push" BOOLEAN NOT NULL,
    "email" BOOLEAN NOT NULL,
    "haveDelivery" BOOLEAN,
    "haveRecurrence" BOOLEAN,
    "haveFidelity" BOOLEAN,
    "haveRide" BOOLEAN,
    "initDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP NOT NULL,
    "cancelledAt" TIMESTAMP,
    "duration" INT,
    "serviceName" VARCHAR(255),
    "professionalName" VARCHAR(255),
    "clientName" VARCHAR(255),
    "ownerName" VARCHAR(255),
    CONSTRAINT "fk_serviceId" FOREIGN KEY ("serviceId") REFERENCES service("_id"),
    CONSTRAINT "fk_ownerId" FOREIGN KEY ("ownerId") REFERENCES users("_id"),
    CONSTRAINT "fk_clientId" FOREIGN KEY ("clientId") REFERENCES client("_id"),
    CONSTRAINT "fk_clientUserId" FOREIGN KEY ("clientUserId") REFERENCES users("_id"),
    CONSTRAINT "fk_professionalId" FOREIGN KEY ("professionalId") REFERENCES users("_id"),
    CONSTRAINT "fk_createdForId" FOREIGN KEY ("createdForId") REFERENCES users("_id"),
    CONSTRAINT "fk_updatedById" FOREIGN KEY ("updatedById") REFERENCES users("_id")
);

CREATE TABLE appointment (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "requestId" UUID,
    "message" TEXT,
    "service" VARCHAR(255),
    "ownerId" UUID,
    "clientId" UUID,
    "professionalId" UUID,
    "serviceId" UUID,
    "status" INT,
    "createdForId" UUID,
    "read" BOOLEAN,
    "cancelled" BOOLEAN,
    "push" BOOLEAN,
    "email" BOOLEAN,
    "initDate" TIMESTAMP,
    "endDate" TIMESTAMP,
    "cancelledAt" TIMESTAMP,
    "cancelledBy" UUID,
    "serviceName" VARCHAR(255),
    "professionalName" VARCHAR(255),
    "clientName" VARCHAR(255),
    "ownerName" VARCHAR(255),
    CONSTRAINT "fk_requestId" FOREIGN KEY ("requestId") REFERENCES request("_id"),
    CONSTRAINT "fk_ownerId" FOREIGN KEY ("ownerId") REFERENCES users("_id"),
    CONSTRAINT "fk_clientId" FOREIGN KEY ("clientId") REFERENCES client("_id"),
    CONSTRAINT "fk_professionalId" FOREIGN KEY ("professionalId") REFERENCES users("_id"),
    CONSTRAINT "fk_serviceId" FOREIGN KEY ("serviceId") REFERENCES service("_id"),
    CONSTRAINT "fk_createdForId" FOREIGN KEY ("createdForId") REFERENCES users("_id"),
    CONSTRAINT "fk_cancelledBy" FOREIGN KEY ("cancelledBy") REFERENCES users("_id")
);

CREATE TABLE account (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "refreshToken" VARCHAR(255) NOT NULL,
    "expiresAt" TIMESTAMP,
    CONSTRAINT "fk_createdById" FOREIGN KEY ("createdById") REFERENCES users("_id")
);

CREATE TABLE rating (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "ratingType" VARCHAR(255) NOT NULL,
    "ratings" JSONB NOT NULL,
    CONSTRAINT "fk_createdById" FOREIGN KEY ("createdById") REFERENCES users("_id")
);

CREATE TABLE rating_result (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "ratingId" UUID NOT NULL,
    "rating" VARCHAR(255),
    "comment" TEXT,
    "requestId" UUID NOT NULL,
    "ratingType" VARCHAR(255) NOT NULL,
    "ratingForId" UUID NOT NULL,
    "ratings" JSONB NOT NULL,
    CONSTRAINT "fk_createdById" FOREIGN KEY ("createdById") REFERENCES users("_id"),
    CONSTRAINT "fk_ratingId" FOREIGN KEY ("ratingId") REFERENCES rating("_id")
);
