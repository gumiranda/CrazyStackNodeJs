import { fakeFollowEntity } from "@/slices/social-network/follow/entities/FollowEntity.spec";
import { FollowEntity } from "@/slices/social-network/follow/entities";
import { DeleteFollowRepository } from "@/slices/social-network/follow/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteFollow } from "./DeleteFollow";
import { Query } from "@/application/types";

describe("deleteFollow", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteFollowRepository: MockProxy<DeleteFollowRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteFollowRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteFollowRepository.deleteFollow.mockResolvedValue(fakeFollowEntity);
  });
  beforeEach(() => {
    testInstance = deleteFollow(deleteFollowRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteFollow of DeleteFollowRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteFollowRepository.deleteFollow).toHaveBeenCalledWith(fakeQuery);
    expect(deleteFollowRepository.deleteFollow).toHaveBeenCalledTimes(1);
  });
  it("should return a new follow deleted when deleteFollowRepository delete it", async () => {
    const follow = await testInstance(fakeQuery);
    expect(follow).toEqual(fakeFollowEntity);
  });
  it("should return null a new follow deleted when deleteFollowRepository delete it", async () => {
    deleteFollowRepository.deleteFollow.mockResolvedValue(null);
    const follow = await testInstance(fakeFollowEntity);
    expect(follow).toBeNull();
  });
  it("should rethrow if deleteFollow of DeleteFollowRepository throws", async () => {
    deleteFollowRepository.deleteFollow.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
