import { fakeTweetEntity } from "@/slices/social-network/tweet/entities/TweetEntity.spec";
import { TweetEntity } from "@/slices/social-network/tweet/entities";
import { AddTweetRepository } from "@/slices/social-network/tweet/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addTweet } from "./AddTweet";

describe("addTweet", () => {
  let testInstance: any;
  let addTweetRepository: MockProxy<AddTweetRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addTweetRepository = mock();
    addTweetRepository.addTweet.mockResolvedValue(fakeTweetEntity);
  });
  beforeEach(() => {
    testInstance = addTweet(addTweetRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addTweet of AddTweetRepository with correct values", async () => {
    await testInstance(fakeTweetEntity);
    expect(addTweetRepository.addTweet).toHaveBeenCalledWith(
      new TweetEntity(fakeTweetEntity)
    );
    expect(addTweetRepository.addTweet).toHaveBeenCalledTimes(1);
  });
  it("should return a new tweet created when addTweetRepository insert it", async () => {
    const tweet = await testInstance(fakeTweetEntity);
    expect(tweet).toEqual(fakeTweetEntity);
  });
  it("should return null a new tweet created when addTweetRepository insert it", async () => {
    addTweetRepository.addTweet.mockResolvedValue(null);
    const tweet = await testInstance(fakeTweetEntity);
    expect(tweet).toBeNull();
  });
  it("should rethrow if addTweet of AddTweetRepository throws", async () => {
    addTweetRepository.addTweet.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeTweetEntity)).rejects.toThrowError("any_error");
  });
});
