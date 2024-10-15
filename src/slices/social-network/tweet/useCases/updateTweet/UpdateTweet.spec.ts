import { UpdateTweetRepository } from "@/slices/social-network/tweet/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTweetEntity } from "@/slices/social-network/tweet/entities/TweetEntity.spec";
import { UpdateTweet, updateTweet } from "./UpdateTweet";

describe("UpdateTweet", () => {
  let fakeQuery: Query;
  let testInstance: UpdateTweet;
  let updateTweetRepository: MockProxy<UpdateTweetRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateTweetRepository = mock();
    fakeQuery = { fields: { userSlug: "123" }, options: {} };
    updateTweetRepository.updateTweet.mockResolvedValue(fakeTweetEntity);
  });
  beforeEach(() => {
    testInstance = updateTweet(updateTweetRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateTweet of UpdateTweetRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeTweetEntity);
    expect(updateTweetRepository.updateTweet).toHaveBeenCalledWith(
      fakeQuery,
      fakeTweetEntity
    );
    expect(updateTweetRepository.updateTweet).toHaveBeenCalledTimes(1);
  });
  it("should return a tweet updateed when updateTweetRepository insert it", async () => {
    const tweet = await testInstance(fakeQuery, fakeTweetEntity);
    expect(tweet).toEqual(fakeTweetEntity);
  });
  it("should return null a new tweet updateed when updateTweetRepository return it", async () => {
    updateTweetRepository.updateTweet.mockResolvedValue(null);
    const tweet = await testInstance(fakeQuery, fakeTweetEntity);
    expect(tweet).toBeNull();
  });
  it("should rethrow if updateTweet of UpdateTweetRepository throws", async () => {
    updateTweetRepository.updateTweet.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeTweetEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
