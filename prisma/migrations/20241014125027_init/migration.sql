CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "account" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "refreshToken" VARCHAR(255) NOT NULL,
    "expiresAt" TIMESTAMP(6),

    CONSTRAINT "account_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "appointment" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255),
    "service" VARCHAR(255),
    "active" BOOLEAN DEFAULT true,
    "cancelled" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "requestId" UUID NOT NULL,
    "message" TEXT,
    "serviceId" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "status" INTEGER NOT NULL,
    "cancelledById" UUID,
    "updatedByRole" VARCHAR(45),
    "read" BOOLEAN DEFAULT false,
    "push" BOOLEAN DEFAULT false,
    "email" BOOLEAN DEFAULT false,
    "initDate" TIMESTAMP(6) NOT NULL,
    "endDate" TIMESTAMP(6) NOT NULL,
    "cancelledAt" TIMESTAMP(6),
    "serviceName" VARCHAR(255),
    "professionalName" VARCHAR(255),
    "clientName" VARCHAR(255),
    "ownerName" VARCHAR(255),

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "category" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "image" VARCHAR(255),
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "charge" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255),
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(255),
    "customer" JSONB,
    "value" DECIMAL NOT NULL,
    "comment" TEXT,
    "correlationID" VARCHAR(255),
    "discount" DECIMAL,
    "fee" DECIMAL,
    "globalID" VARCHAR(255),
    "transactionID" VARCHAR(255),
    "valueWithDiscount" DECIMAL,
    "identifier" VARCHAR(255),
    "paymentLinkID" VARCHAR(255),
    "paymentLinkUrl" VARCHAR(255),
    "qrCodeImage" VARCHAR(255),
    "expiresIn" INTEGER,
    "expiresDate" TIMESTAMP(6),
    "brCode" TEXT,
    "pixKey" VARCHAR(255),
    "additionalInfo" JSONB,
    "gatewayDetails" JSONB,
    "pagarmeOrder" JSONB,
    "type" VARCHAR(255),

    CONSTRAINT "charge_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "client" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "cpf" VARCHAR(14),
    "phone" VARCHAR(15),
    "userId" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "birthDate" DATE,
    "appointmentsTotal" INTEGER,
    "myOwnerId" UUID,

    CONSTRAINT "client_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "customer" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "cpf" VARCHAR(14),
    "correlationID" VARCHAR(255),
    "gatewayDetails" JSONB,
    "pagarmeCustomer" JSONB,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "taxID" JSONB NOT NULL,
    "address" JSONB,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "fidelity" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "ownerId" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "points" INTEGER NOT NULL,
    "clientId" UUID NOT NULL,

    CONSTRAINT "fidelity_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "mapRoute" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "source" JSONB NOT NULL,
    "source_id" VARCHAR(255),
    "destination_id" VARCHAR(255),
    "destination" JSONB NOT NULL,
    "distance" DECIMAL NOT NULL,
    "duration" DECIMAL NOT NULL,
    "directions" TEXT NOT NULL,
    "routeDriver" JSONB,

    CONSTRAINT "mapRoute_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "order" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "percentageAdopted" DECIMAL,
    "paymentForm" VARCHAR(255),
    "orderPaidByClient" BOOLEAN,
    "comissionPaidByOwner" BOOLEAN,
    "comissionValue" DECIMAL,
    "totalValue" DECIMAL,
    "professionalId" UUID,
    "ownerId" UUID,
    "requestId" UUID,
    "clientId" UUID,
    "extraCost" DECIMAL,
    "normalCost" DECIMAL,
    "haveFidelity" BOOLEAN,
    "haveDelivery" BOOLEAN,
    "pointsUsed" INTEGER,
    "appointmentDate" TIMESTAMP(6),

    CONSTRAINT "order_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "owner" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "appointmentsTotal" INTEGER DEFAULT 0,
    "ratingsTotal" INTEGER DEFAULT 0,
    "haveDelivery" BOOLEAN,
    "typeTax" VARCHAR(50),
    "costByTimeDriving" DECIMAL,
    "fidelityTaxPoints" DECIMAL,
    "fixedTax" DECIMAL,
    "minimumTimeForReSchedule" INTEGER,
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

    CONSTRAINT "owner_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "photo" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "provider" VARCHAR(255) NOT NULL,
    "expiresIn" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN DEFAULT true,
    "expiresInSeconds" INTEGER NOT NULL DEFAULT 60,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photo_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "playing_with_neon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" REAL,

    CONSTRAINT "playing_with_neon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "rating" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "ratingType" VARCHAR(255) NOT NULL,
    "ratings" JSONB[],

    CONSTRAINT "rating_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ratingResult" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "ratingId" UUID NOT NULL,
    "rating" INTEGER DEFAULT 0,
    "comment" TEXT,
    "requestId" UUID NOT NULL,
    "ratingType" VARCHAR(255) NOT NULL,
    "ratingForId" UUID NOT NULL,
    "ratings" JSONB[],

    CONSTRAINT "ratingResult_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "recurrence" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "type" INTEGER NOT NULL,
    "accept" BOOLEAN NOT NULL,
    "appointmentsWasInserted" BOOLEAN NOT NULL,
    "frequency" INTEGER NOT NULL,
    "initDate" TIMESTAMP(6) NOT NULL,
    "endDate" TIMESTAMP(6) NOT NULL,
    "professionalId" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "serviceId" UUID NOT NULL,

    CONSTRAINT "recurrence_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "request" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255),
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "serviceId" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "clientUserId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "status" INTEGER NOT NULL,
    "createdForId" UUID NOT NULL,
    "updatedById" UUID,
    "updatedByRole" VARCHAR(45),
    "read" BOOLEAN DEFAULT false,
    "push" BOOLEAN DEFAULT false,
    "email" BOOLEAN DEFAULT false,
    "haveDelivery" BOOLEAN DEFAULT false,
    "haveRecurrence" BOOLEAN DEFAULT false,
    "haveFidelity" BOOLEAN DEFAULT false,
    "haveRide" BOOLEAN DEFAULT false,
    "initDate" TIMESTAMP(6) NOT NULL,
    "endDate" TIMESTAMP(6) NOT NULL,
    "cancelledAt" TIMESTAMP(6),
    "duration" INTEGER NOT NULL,
    "serviceName" VARCHAR(255),
    "professionalName" VARCHAR(255),
    "clientName" VARCHAR(255),
    "ownerName" VARCHAR(255),
    "fidelity" JSONB,
    "ride" JSONB,
    "recurrence" JSONB,
    "order" JSONB,

    CONSTRAINT "request_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ride" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "driverUserType" VARCHAR(255) NOT NULL,
    "requestId" UUID NOT NULL,
    "origin" JSONB NOT NULL,
    "destiny" JSONB NOT NULL,
    "status" INTEGER NOT NULL,
    "distance" DECIMAL NOT NULL,
    "distanceTime" INTEGER NOT NULL,
    "maxCostEstimated" DECIMAL NOT NULL,
    "minCostEstimated" DECIMAL NOT NULL,
    "finalCost" DECIMAL NOT NULL,
    "costDefinedByOwner" DECIMAL,
    "initDate" TIMESTAMP(6) NOT NULL,
    "endDateEstimated" TIMESTAMP(6) NOT NULL,
    "endDate" TIMESTAMP(6),

    CONSTRAINT "ride_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "routeDriver" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "routeId" UUID NOT NULL,
    "points" JSONB NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "routeDriver_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "service" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "comission" DECIMAL NOT NULL,
    "categoryId" UUID NOT NULL,
    "productsQuantityNeeded" INTEGER,
    "productId" UUID,
    "promotionalPrice" DECIMAL,
    "finalPrice" DECIMAL,
    "havePromotionalPrice" BOOLEAN,
    "hasFidelityGenerator" BOOLEAN,
    "generateHowManyPoints" INTEGER,
    "appointmentsTotal" INTEGER DEFAULT 0,
    "canPayWithFidelityPoints" BOOLEAN,
    "howManyPointsIsNeededToRescue" INTEGER,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255),
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "customer" JSONB,
    "value" DECIMAL,
    "comment" TEXT,
    "additionalInfo" JSONB,
    "dayGenerateCharge" VARCHAR(10),
    "globalID" VARCHAR(255),
    "gatewayDetails" JSONB,
    "priceId" UUID,
    "pagarmeSubscription" JSONB,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "event" VARCHAR(255) NOT NULL,
    "charge" JSONB NOT NULL,
    "pix" JSONB,
    "company" JSONB,
    "account" JSONB,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "users" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "confirmedEmail" BOOLEAN DEFAULT false,
    "sendedEmail" BOOLEAN DEFAULT false,
    "password" VARCHAR(255) NOT NULL,
    "cardId" UUID,
    "ownerId" UUID,
    "myOwnerId" UUID,
    "payDay" VARCHAR(255),
    "photoUrl" VARCHAR(255),
    "cpf" VARCHAR(255),
    "phone" VARCHAR(255),
    "coord" JSONB,
    "distance" DECIMAL,
    "appointmentsTotal" INTEGER DEFAULT 0,
    "plan" VARCHAR(255),
    "cnpj" VARCHAR(255),
    "city" VARCHAR(255),
    "uf" VARCHAR(255),
    "address" TEXT,
    "complement" TEXT,
    "photoId" UUID,
    "cash" BOOLEAN DEFAULT false,
    "creditcard" BOOLEAN DEFAULT false,
    "debitcard" BOOLEAN DEFAULT false,
    "transferbank" BOOLEAN DEFAULT false,
    "cheque" BOOLEAN DEFAULT false,
    "pix" BOOLEAN DEFAULT false,
    "nextPlan" VARCHAR(255),
    "addresses" JSONB,
    "clientId" UUID,
    "active" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "serviceIds" VARCHAR(255)[],
    "serviceOptions" JSONB[],
    "globalID" VARCHAR(255),
    "customerID" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE INDEX "idx_account_createdbyid" ON "account"("createdById");

-- CreateIndex
CREATE INDEX "idx_appointment_clientid" ON "appointment"("clientId");

-- CreateIndex
CREATE INDEX "idx_appointment_createdbyid" ON "appointment"("createdById");

-- CreateIndex
CREATE INDEX "idx_appointment_ownerid" ON "appointment"("ownerId");

-- CreateIndex
CREATE INDEX "idx_appointment_professionalid" ON "appointment"("professionalId");

-- CreateIndex
CREATE INDEX "idx_appointment_requestid" ON "appointment"("requestId");

-- CreateIndex
CREATE INDEX "idx_appointment_serviceid" ON "appointment"("serviceId");

-- CreateIndex
CREATE INDEX "idx_category_createdbyid" ON "category"("createdById");

-- CreateIndex
CREATE INDEX "idx_charge_createdbyid" ON "charge"("createdById");

-- CreateIndex
CREATE INDEX "idx_client_createdbyid" ON "client"("createdById");

-- CreateIndex
CREATE INDEX "idx_client_myownerid" ON "client"("myOwnerId");

-- CreateIndex
CREATE INDEX "idx_client_ownerid" ON "client"("ownerId");

-- CreateIndex
CREATE INDEX "idx_client_userid" ON "client"("userId");

-- CreateIndex
CREATE INDEX "idx_customer_correlationid" ON "customer"("correlationID");

-- CreateIndex
CREATE INDEX "idx_customer_createdbyid" ON "customer"("createdById");

-- CreateIndex
CREATE INDEX "idx_fidelity_clientid" ON "fidelity"("clientId");

-- CreateIndex
CREATE INDEX "idx_fidelity_createdbyid" ON "fidelity"("createdById");

-- CreateIndex
CREATE INDEX "idx_fidelity_ownerid" ON "fidelity"("ownerId");

-- CreateIndex
CREATE INDEX "idx_fidelity_requestid" ON "fidelity"("requestId");

-- CreateIndex
CREATE INDEX "idx_maproute_createdbyid" ON "mapRoute"("createdById");

-- CreateIndex
CREATE INDEX "idx_order_clientid" ON "order"("clientId");

-- CreateIndex
CREATE INDEX "idx_order_createdbyid" ON "order"("createdById");

-- CreateIndex
CREATE INDEX "idx_order_ownerid" ON "order"("ownerId");

-- CreateIndex
CREATE INDEX "idx_order_professionalid" ON "order"("professionalId");

-- CreateIndex
CREATE INDEX "idx_order_requestid" ON "order"("requestId");

-- CreateIndex
CREATE INDEX "idx_owner_createdbyid" ON "owner"("createdById");

-- CreateIndex
CREATE INDEX "idx_photo_createdbyid" ON "photo"("createdById");

-- CreateIndex
CREATE INDEX "idx_product_createdbyid" ON "product"("createdById");

-- CreateIndex
CREATE INDEX "idx_rating_createdbyid" ON "rating"("createdById");

-- CreateIndex
CREATE INDEX "idx_rating_result_createdbyid" ON "ratingResult"("createdById");

-- CreateIndex
CREATE INDEX "idx_rating_result_ratingforid" ON "ratingResult"("ratingForId");

-- CreateIndex
CREATE INDEX "idx_rating_result_ratingid" ON "ratingResult"("ratingId");

-- CreateIndex
CREATE INDEX "idx_rating_result_requestid" ON "ratingResult"("requestId");

-- CreateIndex
CREATE INDEX "idx_recurrence_clientid" ON "recurrence"("clientId");

-- CreateIndex
CREATE INDEX "idx_recurrence_createdbyid" ON "recurrence"("createdById");

-- CreateIndex
CREATE INDEX "idx_recurrence_ownerid" ON "recurrence"("ownerId");

-- CreateIndex
CREATE INDEX "idx_recurrence_professionalid" ON "recurrence"("professionalId");

-- CreateIndex
CREATE INDEX "idx_recurrence_requestid" ON "recurrence"("requestId");

-- CreateIndex
CREATE INDEX "idx_recurrence_serviceid" ON "recurrence"("serviceId");

-- CreateIndex
CREATE INDEX "idx_request_clientid" ON "request"("clientId");

-- CreateIndex
CREATE INDEX "idx_request_clientuserid" ON "request"("clientUserId");

-- CreateIndex
CREATE INDEX "idx_request_createdbyid" ON "request"("createdById");

-- CreateIndex
CREATE INDEX "idx_request_createdforid" ON "request"("createdForId");

-- CreateIndex
CREATE INDEX "idx_request_ownerid" ON "request"("ownerId");

-- CreateIndex
CREATE INDEX "idx_request_professionalid" ON "request"("professionalId");

-- CreateIndex
CREATE INDEX "idx_request_serviceid" ON "request"("serviceId");

-- CreateIndex
CREATE INDEX "idx_ride_createdbyid" ON "ride"("createdById");

-- CreateIndex
CREATE INDEX "idx_ride_requestid" ON "ride"("requestId");

-- CreateIndex
CREATE INDEX "idx_routedriver_createdbyid" ON "routeDriver"("createdById");

-- CreateIndex
CREATE INDEX "idx_routedriver_routeid" ON "routeDriver"("routeId");

-- CreateIndex
CREATE INDEX "idx_service_categoryid" ON "service"("categoryId");

-- CreateIndex
CREATE INDEX "idx_service_createdbyid" ON "service"("createdById");

-- CreateIndex
CREATE INDEX "idx_subscription_createdbyid" ON "subscription"("createdById");

-- CreateIndex
CREATE INDEX "idx_transaction_createdbyid" ON "transaction"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_createdbyid" ON "users"("createdById");

-- CreateIndex
CREATE INDEX "idx_users_myownerid" ON "users"("myOwnerId");

-- CreateIndex
CREATE INDEX "idx_users_ownerid" ON "users"("ownerId");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "fk_createdById" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "fk_cancelledById_appointment" FOREIGN KEY ("cancelledById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "fk_clientId_appointment" FOREIGN KEY ("clientId") REFERENCES "client"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "fk_ownerId_appointment" FOREIGN KEY ("ownerId") REFERENCES "owner"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "fk_professionalId_appointment" FOREIGN KEY ("professionalId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "fk_requestId_appointment" FOREIGN KEY ("requestId") REFERENCES "request"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "fk_createdById_category" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "charge" ADD CONSTRAINT "fk_createdById_charge" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_myOwnerId_fkey" FOREIGN KEY ("myOwnerId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "fk_createdById_customer" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fidelity" ADD CONSTRAINT "fk_clientId_fidelity" FOREIGN KEY ("clientId") REFERENCES "client"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fidelity" ADD CONSTRAINT "fk_createdById_fidelity" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fidelity" ADD CONSTRAINT "fk_ownerId_fidelity" FOREIGN KEY ("ownerId") REFERENCES "owner"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mapRoute" ADD CONSTRAINT "fk_createdById_maproute" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "fk_clientId_order" FOREIGN KEY ("clientId") REFERENCES "client"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "fk_createdById_order" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "fk_ownerId_order" FOREIGN KEY ("ownerId") REFERENCES "owner"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "fk_professionalId_order" FOREIGN KEY ("professionalId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "owner" ADD CONSTRAINT "fk_createdById_owner" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "fk_createdById_fidelity" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_createdById_product" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "fk_createdById" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ratingResult" ADD CONSTRAINT "fk_createdById" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recurrence" ADD CONSTRAINT "fk_clientId_recurrence" FOREIGN KEY ("clientId") REFERENCES "client"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recurrence" ADD CONSTRAINT "fk_createdById_recurrence" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recurrence" ADD CONSTRAINT "fk_ownerId_recurrence" FOREIGN KEY ("ownerId") REFERENCES "owner"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recurrence" ADD CONSTRAINT "fk_professionalId_recurrence" FOREIGN KEY ("professionalId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recurrence" ADD CONSTRAINT "fk_serviceId_recurrence" FOREIGN KEY ("serviceId") REFERENCES "service"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "fk_clientId_request" FOREIGN KEY ("clientId") REFERENCES "client"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "fk_clientUserId_request" FOREIGN KEY ("clientUserId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "fk_createdForId_request" FOREIGN KEY ("createdForId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "fk_ownerId_request" FOREIGN KEY ("ownerId") REFERENCES "owner"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "fk_professionalId_request" FOREIGN KEY ("professionalId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "fk_serviceId_request" FOREIGN KEY ("serviceId") REFERENCES "service"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "fk_updatedById_request" FOREIGN KEY ("updatedById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ride" ADD CONSTRAINT "fk_createdById_ride" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "routeDriver" ADD CONSTRAINT "fk_createdById_routeDriver" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "fk_categoryId" FOREIGN KEY ("categoryId") REFERENCES "category"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "fk_createdById_service" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "fk_createdById_subscription" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "fk_createdById_transaction" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "fk_ownerid" FOREIGN KEY ("ownerId") REFERENCES "owner"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_myOwnerId_fkey" FOREIGN KEY ("myOwnerId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
