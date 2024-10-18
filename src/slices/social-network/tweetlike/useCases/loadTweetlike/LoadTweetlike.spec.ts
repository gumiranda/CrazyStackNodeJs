import { LoadTweetlikeRepository } from "@/slices/tweetlike/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTweetlikeEntity } from "@/slices/tweetlike/entities/TweetlikeEntity.spec";
import { LoadTweetlike, loadTweetlike } from "./LoadTweetlike";

describe("LoadTweetlike", () => {
    let fakeQuery: Query;
    let testInstance: LoadTweetlike;
    let loadTweetlikeRepository: MockProxy<LoadTweetlikeRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadTweetlikeRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadTweetlikeRepository.loadTweetlike.mockResolvedValue(fakeTweetlikeEntity);
    });
    beforeEach(() => {
        testInstance = loadTweetlike(loadTweetlikeRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadTweetlike of LoadTweetlikeRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadTweetlikeRepository.loadTweetlike).toHaveBeenCalledWith(fakeQuery);
        expect(loadTweetlikeRepository.loadTweetlike).toHaveBeenCalledTimes(1);
    });
    it("should return a tweetlike loaded when loadTweetlikeRepository insert it", async () => {
        const tweetlike = await testInstance(fakeQuery);
        expect(tweetlike).toEqual(fakeTweetlikeEntity);
    });
    it("should return null a new tweetlike loaded when loadTweetlikeRepository return it", async () => {
        loadTweetlikeRepository.loadTweetlike.mockResolvedValue(null);
        const tweetlike = await testInstance(fakeQuery);
        expect(tweetlike).toBeNull();
    });
    it("should rethrow if loadTweetlike of LoadTweetlikeRepository throws", async () => {
        loadTweetlikeRepository.loadTweetlike.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
