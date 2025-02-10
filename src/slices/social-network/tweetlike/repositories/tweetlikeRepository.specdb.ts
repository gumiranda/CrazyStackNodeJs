import {
  fakeTweetlikeEntity,
  fakeTweetlikePaginated,
} from "@/slices/social-network/tweetlike/entities/TweetlikeEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { TweetlikeRepository } from "./tweetlikeRepository";

describe("Tweetlike Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: TweetlikeRepository;
  let repository: MockProxy<Repository>;
  let repository2: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { userSlug: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository2 = mock<Repository>();
    repository.add.mockResolvedValue(fakeTweetlikeEntity);
    repository.getOne.mockResolvedValue(fakeTweetlikeEntity);
    repository.update.mockResolvedValue(fakeTweetlikeEntity);
    repository.getPaginate.mockResolvedValue(fakeTweetlikePaginated?.tweetlikes);
    repository.getCount.mockResolvedValue(fakeTweetlikePaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new TweetlikeRepository(repository, repository2);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  // test("should call add of addTweetlike with correct values", async () => {
  //   await testInstance.addTweetlike(fakeTweetlikeEntity);
  //   expect(repository.add).toHaveBeenCalledWith(fakeTweetlikeEntity);
  //   expect(repository.add).toHaveBeenCalledTimes(1);
  // });
  // test("should return a new tweetlike created when addTweetlike insert it", async () => {
  //   const result = await testInstance.addTweetlike(fakeTweetlikeEntity);
  //   expect(result).toEqual(fakeTweetlikeEntity);
  // });
  // test("should return null when addTweetlike returns null", async () => {
  //   repository.add.mockResolvedValueOnce(null);
  //   const result = await testInstance.addTweetlike(fakeTweetlikeEntity);
  //   expect(result).toBeNull();
  // });
  // test("should rethrow if add of addTweetlike throws", async () => {
  //   repository.add.mockRejectedValueOnce(new Error("Error"));
  //   const result = testInstance.addTweetlike(fakeTweetlikeEntity);
  //   await expect(result).rejects.toThrow("Error");
  // });
  test("should rethrow if update of updateTweetlike throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateTweetlike(fakeQuery, fakeTweetlikeEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateTweetlike with correct values", async () => {
    await testInstance.updateTweetlike(fakeQuery, fakeTweetlikeEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeTweetlikeEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a tweetlike updated when updateTweetlike update it", async () => {
    const result = await testInstance.updateTweetlike(fakeQuery, fakeTweetlikeEntity);
    expect(result).toEqual(fakeTweetlikeEntity);
  });
  test("should return a tweetlike updated when updateTweetlike update it when i pass null", async () => {
    const result = await testInstance.updateTweetlike(null as any, fakeTweetlikeEntity);
    expect(result).toEqual(fakeTweetlikeEntity);
  });
  test("should return null when updateTweetlike returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateTweetlike(fakeQuery, fakeTweetlikeEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateTweetlike throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateTweetlike(fakeQuery, fakeTweetlikeEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteTweetlike with correct values", async () => {
    await testInstance.deleteTweetlike(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new tweetlike created when deleteTweetlike insert it", async () => {
    const result = await testInstance.deleteTweetlike(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteTweetlike returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteTweetlike(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteTweetlike throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteTweetlike(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadTweetlike with correct values", async () => {
    await testInstance.loadTweetlike(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a tweetlike when loadTweetlike loaded it", async () => {
    const result = await testInstance.loadTweetlike(fakeQuery);
    expect(result).toEqual(fakeTweetlikeEntity);
  });
  test("should return null when loadTweetlike returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadTweetlike(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadTweetlike returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadTweetlike(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadTweetlike throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadTweetlike(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadTweetlikeByPage with correct values", async () => {
    await testInstance.loadTweetlikeByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadTweetlikeByPage with correct values", async () => {
    await testInstance.loadTweetlikeByPage(fakeQuery);
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
  test("should return a tweetlikeByPage when loadTweetlikeByPage loaded it", async () => {
    const result = await testInstance.loadTweetlikeByPage(fakeQuery);
    expect(result).toEqual(fakeTweetlikePaginated);
  });
  test("should return null when loadTweetlikeByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadTweetlikeByPage(fakeQuery);
    expect(result).toEqual({ tweetlikes: null, total: 0 });
  });
  test("should return null when loadTweetlikeByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadTweetlikeByPage(null as any);
    expect(result).toEqual({ tweetlikes: null, total: 0 });
  });
  test("should rethrow if load of loadTweetlikeByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadTweetlikeByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
