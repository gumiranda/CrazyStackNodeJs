import { fakeTweetlikeEntity } from "@/slices/social-network/tweetlike/entities/TweetlikeEntity.spec";
import { DeleteTweetlikeRepository } from "@/slices/social-network/tweetlike/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteTweetlike } from "./DeleteTweetlike";
import { Query } from "@/application/types";

describe("deleteTweetlike", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteTweetlikeRepository: MockProxy<DeleteTweetlikeRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteTweetlikeRepository = mock();
    fakeQuery = { fields: { userSlug: "123" }, options: {} };
    deleteTweetlikeRepository.deleteTweetlike.mockResolvedValue(fakeTweetlikeEntity);
  });
  beforeEach(() => {
    testInstance = deleteTweetlike(deleteTweetlikeRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteTweetlike of DeleteTweetlikeRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteTweetlikeRepository.deleteTweetlike).toHaveBeenCalledWith(fakeQuery);
    expect(deleteTweetlikeRepository.deleteTweetlike).toHaveBeenCalledTimes(1);
  });
  it("should return a new tweetlike deleted when deleteTweetlikeRepository delete it", async () => {
    const tweetlike = await testInstance(fakeQuery);
    expect(tweetlike).toEqual(fakeTweetlikeEntity);
  });
  it("should return null a new tweetlike deleted when deleteTweetlikeRepository delete it", async () => {
    deleteTweetlikeRepository.deleteTweetlike.mockResolvedValue(null);
    const tweetlike = await testInstance(fakeTweetlikeEntity);
    expect(tweetlike).toBeNull();
  });
  it("should rethrow if deleteTweetlike of DeleteTweetlikeRepository throws", async () => {
    deleteTweetlikeRepository.deleteTweetlike.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
