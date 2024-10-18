import { fakeTweetlikeEntity } from "@/slices/tweetlike/entities/TweetlikeEntity.spec";
import { TweetlikeEntity } from "@/slices/tweetlike/entities";
import { AddTweetlikeRepository } from "@/slices/tweetlike/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addTweetlike } from "./AddTweetlike";

describe("addTweetlike", () => {
    let testInstance: any;
    let addTweetlikeRepository: MockProxy<AddTweetlikeRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addTweetlikeRepository = mock();
        addTweetlikeRepository.addTweetlike.mockResolvedValue(fakeTweetlikeEntity);
    });
    beforeEach(() => {
        testInstance = addTweetlike(addTweetlikeRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addTweetlike of AddTweetlikeRepository with correct values", async () => {
        await testInstance(fakeTweetlikeEntity);
        expect(addTweetlikeRepository.addTweetlike).toHaveBeenCalledWith(
            new TweetlikeEntity(fakeTweetlikeEntity)
        );
        expect(addTweetlikeRepository.addTweetlike).toHaveBeenCalledTimes(1);
    });
    it("should return a new tweetlike created when addTweetlikeRepository insert it", async () => {
        const tweetlike = await testInstance(fakeTweetlikeEntity);
        expect(tweetlike).toEqual(fakeTweetlikeEntity);
    });
    it("should return null a new tweetlike created when addTweetlikeRepository insert it", async () => {
        addTweetlikeRepository.addTweetlike.mockResolvedValue(null);
        const tweetlike = await testInstance(fakeTweetlikeEntity);
        expect(tweetlike).toBeNull();
    });
    it("should rethrow if addTweetlike of AddTweetlikeRepository throws", async () => {
        addTweetlikeRepository.addTweetlike.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeTweetlikeEntity)).rejects.toThrowError("any_error");
    });
});
