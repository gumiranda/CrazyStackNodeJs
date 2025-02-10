CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

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
    "globalID" VARCHAR(255),
    FOREIGN KEY ("createdById") REFERENCES users("_id"),
    FOREIGN KEY ("myOwnerId") REFERENCES users("_id")
);
-- ALTER TABLE users ALTER COLUMN "globalID" TYPE VARCHAR(255);
ALTER TABLE users ADD COLUMN "customerID" VARCHAR(255);

-- Indexes for users table
CREATE INDEX idx_users_createdById ON users("createdById");
CREATE INDEX idx_users_ownerId ON users("ownerId");
CREATE INDEX idx_users_myOwnerId ON users("myOwnerId");

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
-- Index for account table
CREATE INDEX idx_account_createdById ON account("createdById");

CREATE TABLE category (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "image" VARCHAR(255),
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_createdById_category" FOREIGN KEY ("createdById") REFERENCES users("_id")
);
-- Index for category table
CREATE INDEX idx_category_createdById ON category("createdById");

CREATE TABLE service (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" NUMERIC NOT NULL,
    "duration" INT NOT NULL,
    "comission" NUMERIC NOT NULL,
    "categoryId" UUID NOT NULL,
    "productsQuantityNeeded" INT,
    "productId" UUID,
    "promotionalPrice" NUMERIC,
    "finalPrice" NUMERIC,
    "havePromotionalPrice" BOOLEAN,
    "hasFidelityGenerator" BOOLEAN,
    "generateHowManyPoints" INT,
    "appointmentsTotal" INT DEFAULT 0,
    "canPayWithFidelityPoints" BOOLEAN,
    "howManyPointsIsNeededToRescue" INT,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_createdById_service" FOREIGN KEY ("createdById") REFERENCES users("_id"),
    CONSTRAINT "fk_categoryId" FOREIGN KEY ("categoryId") REFERENCES category("_id")
);
-- Indexes for service table
CREATE INDEX idx_service_createdById ON service("createdById");
CREATE INDEX idx_service_categoryId ON service("categoryId");

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
    CONSTRAINT "check_fidelityTaxPoints" CHECK ("fidelityTaxPoints" >= 0),
    CONSTRAINT "check_fixedTax" CHECK ("fixedTax" >= 0),
    CONSTRAINT "fk_createdById_owner" FOREIGN KEY ("createdById") REFERENCES users("_id")
);
ALTER TABLE users ADD CONSTRAINT fk_ownerId FOREIGN KEY ("ownerId") REFERENCES owner("_id");
-- Index for owner table
CREATE INDEX idx_owner_createdById ON owner("createdById");
CREATE TABLE client (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    FOREIGN KEY ("myOwnerId") REFERENCES users("_id")
);
-- Indexes for client table
CREATE INDEX idx_client_createdById ON client("createdById");
CREATE INDEX idx_client_userId ON client("userId");
CREATE INDEX idx_client_ownerId ON client("ownerId");
CREATE INDEX idx_client_myOwnerId ON client("myOwnerId");
CREATE TABLE request (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255),
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "serviceId" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "clientUserId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "status" INT NOT NULL ,
    "createdForId" UUID NOT NULL,
    "updatedById" UUID,
    "updatedByRole" VARCHAR(45),
    "read" BOOLEAN DEFAULT FALSE,
    "push" BOOLEAN DEFAULT FALSE,
    "email" BOOLEAN DEFAULT FALSE,
    "haveDelivery" BOOLEAN DEFAULT FALSE,
    "haveRecurrence" BOOLEAN DEFAULT FALSE,
    "haveFidelity" BOOLEAN DEFAULT FALSE,
    "haveRide" BOOLEAN DEFAULT FALSE,
    "initDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP NOT NULL,
    "cancelledAt" TIMESTAMP,
    "duration" INT NOT NULL ,
    "serviceName" VARCHAR(255),
    "professionalName" VARCHAR(255),
    "clientName" VARCHAR(255),
    "ownerName" VARCHAR(255),
    "fidelity" JSONB,
    "ride" JSONB,
    "recurrence" JSONB,
    "order" JSONB,
    CONSTRAINT "fk_serviceId_request" FOREIGN KEY ("serviceId") REFERENCES service("_id"),
    CONSTRAINT "fk_ownerId_request" FOREIGN KEY ("ownerId") REFERENCES owner("_id"),
    CONSTRAINT "fk_clientId_request" FOREIGN KEY ("clientId") REFERENCES client("_id"),
    CONSTRAINT "fk_clientUserId_request" FOREIGN KEY ("clientUserId") REFERENCES users("_id"),
    CONSTRAINT "fk_professionalId_request" FOREIGN KEY ("professionalId") REFERENCES users("_id"),
    CONSTRAINT "fk_createdForId_request" FOREIGN KEY ("createdForId") REFERENCES users("_id"),
    CONSTRAINT "fk_updatedById_request" FOREIGN KEY ("updatedById") REFERENCES users("_id")
);
-- Indexes for request table
CREATE INDEX idx_request_createdById ON request("createdById");
CREATE INDEX idx_request_serviceId ON request("serviceId");
CREATE INDEX idx_request_ownerId ON request("ownerId");
CREATE INDEX idx_request_clientId ON request("clientId");
CREATE INDEX idx_request_clientUserId ON request("clientUserId");
CREATE INDEX idx_request_professionalId ON request("professionalId");
CREATE INDEX idx_request_createdForId ON request("createdForId");
CREATE TABLE appointment (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255),
    "service" VARCHAR(255),
    "active" BOOLEAN DEFAULT TRUE,
    "cancelled" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "requestId" UUID NOT NULL,
    "message" TEXT  ,
    "serviceId" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "status" INT NOT NULL ,
    "cancelledById" UUID,
    "updatedByRole" VARCHAR(45),
    "read" BOOLEAN DEFAULT FALSE,
    "push" BOOLEAN DEFAULT FALSE,
    "email" BOOLEAN DEFAULT FALSE,
    "initDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP NOT NULL,
    "cancelledAt" TIMESTAMP,
    "serviceName" VARCHAR(255),
    "professionalName" VARCHAR(255),
    "clientName" VARCHAR(255),
    "ownerName" VARCHAR(255),
    CONSTRAINT "fk_requestId_appointment" FOREIGN KEY ("requestId") REFERENCES request("_id"),
    CONSTRAINT "fk_serviceId_appointment" FOREIGN KEY ("serviceId") REFERENCES service("_id"),
    CONSTRAINT "fk_ownerId_appointment" FOREIGN KEY ("ownerId") REFERENCES owner("_id"),
    CONSTRAINT "fk_clientId_appointment" FOREIGN KEY ("clientId") REFERENCES client("_id"),
    CONSTRAINT "fk_professionalId_appointment" FOREIGN KEY ("professionalId") REFERENCES users("_id"),
    CONSTRAINT "fk_cancelledById_appointment" FOREIGN KEY ("cancelledById") REFERENCES users("_id")
);
CREATE INDEX idx_appointment_createdById ON appointment("createdById");
CREATE INDEX idx_appointment_requestId ON appointment("requestId");
CREATE INDEX idx_appointment_serviceId ON appointment("serviceId");
CREATE INDEX idx_appointment_ownerId ON appointment("ownerId");
CREATE INDEX idx_appointment_clientId ON appointment("clientId");
CREATE INDEX idx_appointment_professionalId ON appointment("professionalId");

CREATE TABLE rating (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "ratingType" VARCHAR(255) NOT NULL,
    "ratings" JSONB[] NOT NULL,
    CONSTRAINT "fk_createdById" FOREIGN KEY ("createdById") REFERENCES users("_id")
);
CREATE INDEX idx_rating_createdById ON rating("createdById");

CREATE TABLE "ratingResult" (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "ratingId" UUID NOT NULL,
    "rating" INT DEFAULT 0,
    "comment" TEXT,
    "requestId" UUID NOT NULL,
    "ratingType" VARCHAR(255) NOT NULL,
    "ratingForId" UUID NOT NULL,
    "ratings" JSONB[],
    CONSTRAINT "fk_createdById" FOREIGN KEY ("createdById") REFERENCES users("_id"),
    CONSTRAINT "fk_ratingId" FOREIGN KEY ("ratingId") REFERENCES rating("_id")
);

CREATE INDEX idx_rating_result_createdById ON "ratingResult"("createdById");
CREATE INDEX idx_rating_result_ratingId ON "ratingResult"("ratingId");
CREATE INDEX idx_rating_result_requestId ON "ratingResult"("requestId");
CREATE INDEX idx_rating_result_ratingForId ON "ratingResult"("ratingForId");


CREATE TABLE ride (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "driverUserType" VARCHAR(255) NOT NULL,
    "requestId" UUID NOT NULL,
    "origin" JSONB NOT NULL,
    "destiny" JSONB NOT NULL,
    "status" INT NOT NULL,
    "distance" NUMERIC NOT NULL,
    "distanceTime" INT NOT NULL,
    "maxCostEstimated" NUMERIC NOT NULL,
    "minCostEstimated" NUMERIC NOT NULL,
    "finalCost" NUMERIC NOT NULL,
    "costDefinedByOwner" NUMERIC,
    "initDate" TIMESTAMP NOT NULL,
    "endDateEstimated" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP,
    CONSTRAINT "fk_createdById_ride" FOREIGN KEY ("createdById") REFERENCES users("_id"),
    CONSTRAINT "fk_requestId_ride" FOREIGN KEY ("requestId") REFERENCES request("_id")
);
-- Indexes for ride table
CREATE INDEX idx_ride_createdById ON ride("createdById");
CREATE INDEX idx_ride_requestId ON ride("requestId");
CREATE TABLE "order" (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "percentageAdopted" NUMERIC,
    "paymentForm" VARCHAR(255),
    "orderPaidByClient" BOOLEAN,
    "comissionPaidByOwner" BOOLEAN,
    "comissionValue" NUMERIC,
    "totalValue" NUMERIC,
    "professionalId" UUID,
    "ownerId" UUID,
    "requestId" UUID,
    "clientId" UUID,
    "extraCost" NUMERIC,
    "normalCost" NUMERIC,
    "haveFidelity" BOOLEAN,
    "haveDelivery" BOOLEAN,
    "pointsUsed" INT,
    "appointmentDate" TIMESTAMP,
    CONSTRAINT "fk_createdById_order" FOREIGN KEY ("createdById") REFERENCES users("_id"),
    CONSTRAINT "fk_professionalId_order" FOREIGN KEY ("professionalId") REFERENCES users("_id"),
    CONSTRAINT "fk_ownerId_order" FOREIGN KEY ("ownerId") REFERENCES owner("_id"),
    CONSTRAINT "fk_requestId_order" FOREIGN KEY ("requestId") REFERENCES request("_id"),
    CONSTRAINT "fk_clientId_order" FOREIGN KEY ("clientId") REFERENCES client("_id")
);
-- Indexes for order table
CREATE INDEX idx_order_createdById ON "order"("createdById");
CREATE INDEX idx_order_professionalId ON "order"("professionalId");
CREATE INDEX idx_order_ownerId ON "order"("ownerId");
CREATE INDEX idx_order_requestId ON "order"("requestId");
CREATE INDEX idx_order_clientId ON "order"("clientId");
CREATE TABLE recurrence (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "type" INT CHECK ("type" IN (0, 1)) NOT NULL,  -- 0 is weekly, 1 is monthly
    "accept" BOOLEAN NOT NULL,
    "appointmentsWasInserted" BOOLEAN NOT NULL,
    "frequency" INT NOT NULL,
    "initDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP NOT NULL,
    "professionalId" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "serviceId" UUID NOT NULL,
    CONSTRAINT "fk_createdById_recurrence" FOREIGN KEY ("createdById") REFERENCES users("_id"),
    CONSTRAINT "fk_professionalId_recurrence" FOREIGN KEY ("professionalId") REFERENCES users("_id"),
    CONSTRAINT "fk_requestId_recurrence" FOREIGN KEY ("requestId") REFERENCES request("_id"),
    CONSTRAINT "fk_clientId_recurrence" FOREIGN KEY ("clientId") REFERENCES client("_id"),
    CONSTRAINT "fk_ownerId_recurrence" FOREIGN KEY ("ownerId") REFERENCES owner("_id"),
    CONSTRAINT "fk_serviceId_recurrence" FOREIGN KEY ("serviceId") REFERENCES service("_id")
);
-- Indexes for recurrence table
CREATE INDEX idx_recurrence_createdById ON recurrence("createdById");
CREATE INDEX idx_recurrence_professionalId ON recurrence("professionalId");
CREATE INDEX idx_recurrence_requestId ON recurrence("requestId");
CREATE INDEX idx_recurrence_clientId ON recurrence("clientId");
CREATE INDEX idx_recurrence_ownerId ON recurrence("ownerId");
CREATE INDEX idx_recurrence_serviceId ON recurrence("serviceId");
CREATE TABLE charge (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255),
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(255),
    "customer" JSONB,
    "value" NUMERIC NOT NULL,
    "comment" TEXT,
    "correlationID" VARCHAR(255),
    "discount" NUMERIC,
    "fee" NUMERIC,
    "globalID" VARCHAR(255)  ,
    "transactionID" VARCHAR(255),
    "valueWithDiscount" NUMERIC,
    "identifier" VARCHAR(255),
    "paymentLinkID" VARCHAR(255),
    "paymentLinkUrl" VARCHAR(255),
    "qrCodeImage" VARCHAR(255),
    "expiresIn" INT,
    "expiresDate" TIMESTAMP,
    "brCode" TEXT,
    "pixKey" VARCHAR(255),
    "additionalInfo" JSONB,
    "gatewayDetails" JSONB,
    "pagarmeOrder" JSONB,
    "type" VARCHAR(255),  -- Adicionando a coluna type
    CONSTRAINT "fk_createdById_charge" FOREIGN KEY ("createdById") REFERENCES users("_id")
);

CREATE INDEX idx_charge_createdById ON charge("createdById");

CREATE TABLE customer (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "cpf" VARCHAR(14),
    "correlationID" VARCHAR(255),
    "gatewayDetails" JSONB,
    "pagarmeCustomer" JSONB,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "taxID" JSONB NOT NULL,
    "address" JSONB,
    CONSTRAINT "fk_createdById_customer" FOREIGN KEY ("createdById") REFERENCES users("_id")
);
CREATE INDEX idx_customer_createdById ON customer("createdById");
CREATE INDEX idx_customer_correlationID ON customer("correlationID");
CREATE TABLE subscription (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) ,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "customer" JSONB ,
    "value" NUMERIC  ,
    "comment" TEXT,
    "additionalInfo" JSONB  ,
    "dayGenerateCharge" VARCHAR(10) ,
    "globalID" VARCHAR(255)  ,
    "gatewayDetails" JSONB,
    "priceId" UUID,
    "pagarmeSubscription" JSONB,
    CONSTRAINT "fk_createdById_subscription" FOREIGN KEY ("createdById") REFERENCES users("_id")
);
CREATE INDEX idx_subscription_createdById ON subscription("createdById");

CREATE TABLE transaction (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "event" VARCHAR(255) NOT NULL,
    "charge" JSONB NOT NULL,
    "pix" JSONB,
    "company" JSONB,
    "account" JSONB,
    CONSTRAINT "fk_createdById_transaction" FOREIGN KEY ("createdById") REFERENCES users("_id")
);
CREATE INDEX idx_transaction_createdById ON transaction("createdById");

CREATE TABLE product (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "quantity" INT NOT NULL,
    CONSTRAINT "fk_createdById_product" FOREIGN KEY ("createdById") REFERENCES users("_id")
);
CREATE INDEX idx_product_createdById ON product("createdById");

CREATE TABLE "mapRoute" (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "source" JSONB NOT NULL,
    "source_id" VARCHAR(255),
    "destination_id" VARCHAR(255),
    "destination" JSONB NOT NULL,
    "distance" NUMERIC NOT NULL,
    "duration" NUMERIC NOT NULL,
    "directions" TEXT NOT NULL,
    "routeDriver" JSONB  ,
    CONSTRAINT "fk_createdById_maproute" FOREIGN KEY ("createdById") REFERENCES users("_id")
);
CREATE INDEX idx_mapRoute_createdById ON "mapRoute"("createdById");

CREATE TABLE "routeDriver" (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "routeId" UUID NOT NULL,
    "points" JSONB NOT NULL,
    "status" VARCHAR(50) NOT NULL, -- FINALIZADO, INICIADO, ETC
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_createdById_routeDriver" FOREIGN KEY ("createdById") REFERENCES users("_id"),
    CONSTRAINT "fk_routeId_routeDriver" FOREIGN KEY ("routeId") REFERENCES "mapRoute"("_id")
);
-- Indexes for routeDriver table
CREATE INDEX idx_routeDriver_createdById ON "routeDriver"("createdById");
CREATE INDEX idx_routeDriver_routeId ON "routeDriver"("routeId");
CREATE TABLE fidelity (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "ownerId" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "points" INT NOT NULL,
    "clientId" UUID NOT NULL,
    CONSTRAINT "fk_createdById_fidelity" FOREIGN KEY ("createdById") REFERENCES users("_id"),
    CONSTRAINT "fk_ownerId_fidelity" FOREIGN KEY ("ownerId") REFERENCES owner("_id"),
    CONSTRAINT "fk_requestId_fidelity" FOREIGN KEY ("requestId") REFERENCES request("_id"),
    CONSTRAINT "fk_clientId_fidelity" FOREIGN KEY ("clientId") REFERENCES client("_id")
);
-- Indexes for fidelity table
CREATE INDEX idx_fidelity_createdById ON fidelity("createdById");
CREATE INDEX idx_fidelity_ownerId ON fidelity("ownerId");
CREATE INDEX idx_fidelity_requestId ON fidelity("requestId");
CREATE INDEX idx_fidelity_clientId ON fidelity("clientId");

CREATE TABLE photo (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "provider" VARCHAR(255) NOT NULL,
    "expiresIn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN DEFAULT TRUE,
    "expiresInSeconds" INT NOT NULL DEFAULT 60,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_createdById_fidelity" FOREIGN KEY ("createdById") REFERENCES users("_id")
);

CREATE INDEX idx_photo_createdById ON photo("createdById");

CREATE TABLE tweettweetlike (
    "_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "tweetId" UUID NOT NULL,
    "tweetlikeId" UUID NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_createdById_fidelity" FOREIGN KEY ("userId") REFERENCES users("_id"),
    CONSTRAINT "fk_tweetId_tweetlike" FOREIGN KEY ("tweetId") REFERENCES tweet("_id"),
    CONSTRAINT "fk_tweetlikeId_tweetlike" FOREIGN KEY ("tweetlikeId") REFERENCES tweetlike("_id")
);
