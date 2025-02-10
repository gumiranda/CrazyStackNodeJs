import { fakeFollowEntity } from "@/slices/social-network/follow/entities/FollowEntity.spec";
import { FollowEntity } from "@/slices/social-network/follow/entities";
import { AddFollowRepository } from "@/slices/social-network/follow/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addFollow } from "./AddFollow";

describe("addFollow", () => {
  let testInstance: any;
  let addFollowRepository: MockProxy<AddFollowRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addFollowRepository = mock();
    addFollowRepository.addFollow.mockResolvedValue(fakeFollowEntity);
  });
  beforeEach(() => {
    testInstance = addFollow(addFollowRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addFollow of AddFollowRepository with correct values", async () => {
    await testInstance(fakeFollowEntity);
    expect(addFollowRepository.addFollow).toHaveBeenCalledWith(
      new FollowEntity(fakeFollowEntity)
    );
    expect(addFollowRepository.addFollow).toHaveBeenCalledTimes(1);
  });
  it("should return a new follow created when addFollowRepository insert it", async () => {
    const follow = await testInstance(fakeFollowEntity);
    expect(follow).toEqual(fakeFollowEntity);
  });
  it("should return null a new follow created when addFollowRepository insert it", async () => {
    addFollowRepository.addFollow.mockResolvedValue(null);
    const follow = await testInstance(fakeFollowEntity);
    expect(follow).toBeNull();
  });
  it("should rethrow if addFollow of AddFollowRepository throws", async () => {
    addFollowRepository.addFollow.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeFollowEntity)).rejects.toThrowError("any_error");
  });
});
