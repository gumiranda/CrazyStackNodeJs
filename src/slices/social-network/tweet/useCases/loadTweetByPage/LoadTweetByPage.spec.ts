import { LoadTweetByPageRepository } from "@/slices/social-network/tweet/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTweetPaginated } from "@/slices/social-network/tweet/entities/TweetEntity.spec";
import { LoadTweetByPage, loadTweetByPage } from "./LoadTweetByPage";

describe("LoadTweetByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadTweetByPage;
  let loadTweetByPageRepository: MockProxy<LoadTweetByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadTweetByPageRepository = mock();
    fakeQuery = { fields: { userSlug: "123" }, options: {} };
    loadTweetByPageRepository.loadTweetByPage.mockResolvedValue(fakeTweetPaginated);
  });
  beforeEach(() => {
    testInstance = loadTweetByPage(loadTweetByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadTweetByPage of LoadTweetByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadTweetByPageRepository.loadTweetByPage).toHaveBeenCalledWith(fakeQuery);
    expect(loadTweetByPageRepository.loadTweetByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a tweet loaded when loadTweetByPageRepository insert it", async () => {
    const tweet = await testInstance(fakeQuery);
    expect(tweet).toEqual(fakeTweetPaginated);
  });
  it("should return null a new tweet loaded when loadTweetByPageRepository return it", async () => {
    loadTweetByPageRepository.loadTweetByPage.mockResolvedValue(null);
    const tweet = await testInstance(fakeQuery);
    expect(tweet).toBeNull();
  });
  it("should rethrow if loadTweetByPage of LoadTweetByPageRepository throws", async () => {
    loadTweetByPageRepository.loadTweetByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
