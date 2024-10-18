import { fakeTweetEntity } from "@/slices/tweet/entities/TweetEntity.spec";
import { TweetEntity } from "@/slices/tweet/entities";
import { DeleteTweetRepository } from "@/slices/tweet/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteTweet } from "./DeleteTweet";
import { Query } from "@/application/types";

describe("deleteTweet", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deleteTweetRepository: MockProxy<DeleteTweetRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteTweetRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deleteTweetRepository.deleteTweet.mockResolvedValue(fakeTweetEntity);
    });
    beforeEach(() => {
        testInstance = deleteTweet(deleteTweetRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deleteTweet of DeleteTweetRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deleteTweetRepository.deleteTweet).toHaveBeenCalledWith(fakeQuery);
        expect(deleteTweetRepository.deleteTweet).toHaveBeenCalledTimes(1);
    });
    it("should return a new tweet deleted when deleteTweetRepository delete it", async () => {
        const tweet = await testInstance(fakeQuery);
        expect(tweet).toEqual(fakeTweetEntity);
    });
    it("should return null a new tweet deleted when deleteTweetRepository delete it", async () => {
        deleteTweetRepository.deleteTweet.mockResolvedValue(null);
        const tweet = await testInstance(fakeTweetEntity);
        expect(tweet).toBeNull();
    });
    it("should rethrow if deleteTweet of DeleteTweetRepository throws", async () => {
        deleteTweetRepository.deleteTweet.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
