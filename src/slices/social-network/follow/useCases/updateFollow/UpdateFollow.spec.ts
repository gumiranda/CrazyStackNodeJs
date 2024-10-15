import { UpdateFollowRepository } from "@/slices/social-network/follow/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeFollowEntity } from "@/slices/social-network/follow/entities/FollowEntity.spec";
import { UpdateFollow, updateFollow } from "./UpdateFollow";

describe("UpdateFollow", () => {
  let fakeQuery: Query;
  let testInstance: UpdateFollow;
  let updateFollowRepository: MockProxy<UpdateFollowRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateFollowRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateFollowRepository.updateFollow.mockResolvedValue(fakeFollowEntity);
  });
  beforeEach(() => {
    testInstance = updateFollow(updateFollowRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateFollow of UpdateFollowRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeFollowEntity);
    expect(updateFollowRepository.updateFollow).toHaveBeenCalledWith(
      fakeQuery,
      fakeFollowEntity
    );
    expect(updateFollowRepository.updateFollow).toHaveBeenCalledTimes(1);
  });
  it("should return a follow updateed when updateFollowRepository insert it", async () => {
    const follow = await testInstance(fakeQuery, fakeFollowEntity);
    expect(follow).toEqual(fakeFollowEntity);
  });
  it("should return null a new follow updateed when updateFollowRepository return it", async () => {
    updateFollowRepository.updateFollow.mockResolvedValue(null);
    const follow = await testInstance(fakeQuery, fakeFollowEntity);
    expect(follow).toBeNull();
  });
  it("should rethrow if updateFollow of UpdateFollowRepository throws", async () => {
    updateFollowRepository.updateFollow.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeFollowEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
