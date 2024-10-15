import { UpdateTweetlikeRepository } from "@/slices/social-network/tweetlike/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTweetlikeEntity } from "@/slices/social-network/tweetlike/entities/TweetlikeEntity.spec";
import { UpdateTweetlike, updateTweetlike } from "./UpdateTweetlike";

describe("UpdateTweetlike", () => {
  let fakeQuery: Query;
  let testInstance: UpdateTweetlike;
  let updateTweetlikeRepository: MockProxy<UpdateTweetlikeRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateTweetlikeRepository = mock();
    fakeQuery = { fields: { userSlug: "123" }, options: {} };
    updateTweetlikeRepository.updateTweetlike.mockResolvedValue(fakeTweetlikeEntity);
  });
  beforeEach(() => {
    testInstance = updateTweetlike(updateTweetlikeRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateTweetlike of UpdateTweetlikeRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeTweetlikeEntity);
    expect(updateTweetlikeRepository.updateTweetlike).toHaveBeenCalledWith(
      fakeQuery,
      fakeTweetlikeEntity
    );
    expect(updateTweetlikeRepository.updateTweetlike).toHaveBeenCalledTimes(1);
  });
  it("should return a tweetlike updateed when updateTweetlikeRepository insert it", async () => {
    const tweetlike = await testInstance(fakeQuery, fakeTweetlikeEntity);
    expect(tweetlike).toEqual(fakeTweetlikeEntity);
  });
  it("should return null a new tweetlike updateed when updateTweetlikeRepository return it", async () => {
    updateTweetlikeRepository.updateTweetlike.mockResolvedValue(null);
    const tweetlike = await testInstance(fakeQuery, fakeTweetlikeEntity);
    expect(tweetlike).toBeNull();
  });
  it("should rethrow if updateTweetlike of UpdateTweetlikeRepository throws", async () => {
    updateTweetlikeRepository.updateTweetlike.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery, fakeTweetlikeEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
