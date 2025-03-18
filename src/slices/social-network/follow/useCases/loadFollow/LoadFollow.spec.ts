import { LoadFollowRepository } from "@/slices/social-network/follow/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeFollowEntity } from "@/slices/social-network/follow/entities/FollowEntity.spec";
import { LoadFollow, loadFollow } from "./LoadFollow";

describe("LoadFollow", () => {
  let fakeQuery: Query;
  let testInstance: LoadFollow;
  let loadFollowRepository: MockProxy<LoadFollowRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadFollowRepository = mock();
    fakeQuery = { fields: { user1Slug: "123" }, options: {} };
    loadFollowRepository.loadFollow.mockResolvedValue(fakeFollowEntity);
  });
  beforeEach(() => {
    testInstance = loadFollow(loadFollowRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadFollow of LoadFollowRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadFollowRepository.loadFollow).toHaveBeenCalledWith(fakeQuery);
    expect(loadFollowRepository.loadFollow).toHaveBeenCalledTimes(1);
  });
  it("should return a follow loaded when loadFollowRepository insert it", async () => {
    const follow = await testInstance(fakeQuery);
    expect(follow).toEqual(fakeFollowEntity);
  });
  it("should return null a new follow loaded when loadFollowRepository return it", async () => {
    loadFollowRepository.loadFollow.mockResolvedValue(null);
    const follow = await testInstance(fakeQuery);
    expect(follow).toBeNull();
  });
  it("should rethrow if loadFollow of LoadFollowRepository throws", async () => {
    loadFollowRepository.loadFollow.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
