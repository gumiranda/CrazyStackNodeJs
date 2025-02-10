-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_createdById_fkey";

-- DropForeignKey
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_createdById_fkey";

-- DropForeignKey
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "tweetlike" DROP CONSTRAINT "tweetlike_createdById_fkey";

-- DropForeignKey
ALTER TABLE "tweetlike" DROP CONSTRAINT "tweetlike_tweetId_fkey";

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "tweet"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tweetlike" ADD CONSTRAINT "tweetlike_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tweetlike" ADD CONSTRAINT "tweetlike_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "tweet"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
