import {
  fakeTweetEntity,
  fakeTweetPaginated,
} from "@/slices/social-network/tweet/entities/TweetEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { TweetRepository } from "./tweetRepository";

describe("Tweet Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: TweetRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { userSlug: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeTweetEntity);
    repository.getOne.mockResolvedValue(fakeTweetEntity);
    repository.update.mockResolvedValue(fakeTweetEntity);
    repository.getPaginate.mockResolvedValue(fakeTweetPaginated?.tweets);
    repository.getCount.mockResolvedValue(fakeTweetPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new TweetRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addTweet with correct values", async () => {
    await testInstance.addTweet(fakeTweetEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeTweetEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new tweet created when addTweet insert it", async () => {
    const result = await testInstance.addTweet(fakeTweetEntity);
    expect(result).toEqual(fakeTweetEntity);
  });
  test("should return null when addTweet returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addTweet(fakeTweetEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addTweet throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addTweet(fakeTweetEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateTweet throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateTweet(fakeQuery, fakeTweetEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateTweet with correct values", async () => {
    await testInstance.updateTweet(fakeQuery, fakeTweetEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeTweetEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a tweet updated when updateTweet update it", async () => {
    const result = await testInstance.updateTweet(fakeQuery, fakeTweetEntity);
    expect(result).toEqual(fakeTweetEntity);
  });
  test("should return a tweet updated when updateTweet update it when i pass null", async () => {
    const result = await testInstance.updateTweet(null as any, fakeTweetEntity);
    expect(result).toEqual(fakeTweetEntity);
  });
  test("should return null when updateTweet returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateTweet(fakeQuery, fakeTweetEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateTweet throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateTweet(fakeQuery, fakeTweetEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteTweet with correct values", async () => {
    await testInstance.deleteTweet(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new tweet created when deleteTweet insert it", async () => {
    const result = await testInstance.deleteTweet(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteTweet returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteTweet(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteTweet throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteTweet(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadTweet with correct values", async () => {
    await testInstance.loadTweet(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a tweet when loadTweet loaded it", async () => {
    const result = await testInstance.loadTweet(fakeQuery);
    expect(result).toEqual(fakeTweetEntity);
  });
  test("should return null when loadTweet returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadTweet(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadTweet returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadTweet(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadTweet throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadTweet(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadTweetByPage with correct values", async () => {
    await testInstance.loadTweetByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadTweetByPage with correct values", async () => {
    await testInstance.loadTweetByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(
      0,
      fakeQuery?.fields,
      {
        createdAt: -1,
      },
      10,
      {}
    );
    expect(repository.getPaginate).toHaveBeenCalledTimes(1);
  });
  test("should return a tweetByPage when loadTweetByPage loaded it", async () => {
    const result = await testInstance.loadTweetByPage(fakeQuery);
    expect(result).toEqual(fakeTweetPaginated);
  });
  test("should return null when loadTweetByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadTweetByPage(fakeQuery);
    expect(result).toEqual({ tweets: null, total: 0 });
  });
  test("should return null when loadTweetByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadTweetByPage(null as any);
    expect(result).toEqual({ tweets: null, total: 0 });
  });
  test("should rethrow if load of loadTweetByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadTweetByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
