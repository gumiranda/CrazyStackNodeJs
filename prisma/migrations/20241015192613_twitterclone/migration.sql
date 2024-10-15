-- CreateTable
CREATE TABLE "tweetlike" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdById" UUID,
    "tweetId" UUID,
    "userSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tweetlike_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "follow" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user1Slug" TEXT NOT NULL,
    "user2Slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "trend" (
    "_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "hashtag" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trend_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "tweetlike" ADD CONSTRAINT "tweetlike_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweetlike" ADD CONSTRAINT "tweetlike_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "tweet"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
