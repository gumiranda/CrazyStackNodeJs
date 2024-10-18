import { LoadTweetlikeByPageRepository } from "@/slices/tweetlike/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTweetlikePaginated } from "@/slices/tweetlike/entities/TweetlikeEntity.spec";
import { LoadTweetlikeByPage, loadTweetlikeByPage } from "./LoadTweetlikeByPage";

describe("LoadTweetlikeByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadTweetlikeByPage;
    let loadTweetlikeByPageRepository: MockProxy<LoadTweetlikeByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadTweetlikeByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadTweetlikeByPageRepository.loadTweetlikeByPage.mockResolvedValue(
            fakeTweetlikePaginated
        );
    });
    beforeEach(() => {
        testInstance = loadTweetlikeByPage(loadTweetlikeByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadTweetlikeByPage of LoadTweetlikeByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadTweetlikeByPageRepository.loadTweetlikeByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadTweetlikeByPageRepository.loadTweetlikeByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a tweetlike loaded when loadTweetlikeByPageRepository insert it", async () => {
        const tweetlike = await testInstance(fakeQuery);
        expect(tweetlike).toEqual(fakeTweetlikePaginated);
    });
    it("should return null a new tweetlike loaded when loadTweetlikeByPageRepository return it", async () => {
        loadTweetlikeByPageRepository.loadTweetlikeByPage.mockResolvedValue(null);
        const tweetlike = await testInstance(fakeQuery);
        expect(tweetlike).toBeNull();
    });
    it("should rethrow if loadTweetlikeByPage of LoadTweetlikeByPageRepository throws", async () => {
        loadTweetlikeByPageRepository.loadTweetlikeByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
