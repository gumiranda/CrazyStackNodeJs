import { LoadTweetRepository } from "@/slices/social-network/tweet/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTweetEntity } from "@/slices/social-network/tweet/entities/TweetEntity.spec";
import { LoadTweet, loadTweet } from "./LoadTweet";

describe("LoadTweet", () => {
  let fakeQuery: Query;
  let testInstance: LoadTweet;
  let loadTweetRepository: MockProxy<LoadTweetRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadTweetRepository = mock();
    fakeQuery = { fields: { userSlug: "123" }, options: {} };
    loadTweetRepository.loadTweet.mockResolvedValue(fakeTweetEntity);
  });
  beforeEach(() => {
    testInstance = loadTweet(loadTweetRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadTweet of LoadTweetRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadTweetRepository.loadTweet).toHaveBeenCalledWith(fakeQuery);
    expect(loadTweetRepository.loadTweet).toHaveBeenCalledTimes(1);
  });
  it("should return a tweet loaded when loadTweetRepository insert it", async () => {
    const tweet = await testInstance(fakeQuery);
    expect(tweet).toEqual(fakeTweetEntity);
  });
  it("should return null a new tweet loaded when loadTweetRepository return it", async () => {
    loadTweetRepository.loadTweet.mockResolvedValue(null);
    const tweet = await testInstance(fakeQuery);
    expect(tweet).toBeNull();
  });
  it("should rethrow if loadTweet of LoadTweetRepository throws", async () => {
    loadTweetRepository.loadTweet.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
