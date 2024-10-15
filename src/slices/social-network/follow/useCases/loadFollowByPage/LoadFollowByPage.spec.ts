import { LoadFollowByPageRepository } from "@/slices/social-network/follow/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeFollowPaginated } from "@/slices/social-network/follow/entities/FollowEntity.spec";
import { LoadFollowByPage, loadFollowByPage } from "./LoadFollowByPage";

describe("LoadFollowByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadFollowByPage;
  let loadFollowByPageRepository: MockProxy<LoadFollowByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadFollowByPageRepository = mock();
    fakeQuery = { fields: { user1Slug: "123" }, options: {} };
    loadFollowByPageRepository.loadFollowByPage.mockResolvedValue(fakeFollowPaginated);
  });
  beforeEach(() => {
    testInstance = loadFollowByPage(loadFollowByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadFollowByPage of LoadFollowByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadFollowByPageRepository.loadFollowByPage).toHaveBeenCalledWith(fakeQuery);
    expect(loadFollowByPageRepository.loadFollowByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a follow loaded when loadFollowByPageRepository insert it", async () => {
    const follow = await testInstance(fakeQuery);
    expect(follow).toEqual(fakeFollowPaginated);
  });
  it("should return null a new follow loaded when loadFollowByPageRepository return it", async () => {
    loadFollowByPageRepository.loadFollowByPage.mockResolvedValue(null);
    const follow = await testInstance(fakeQuery);
    expect(follow).toBeNull();
  });
  it("should rethrow if loadFollowByPage of LoadFollowByPageRepository throws", async () => {
    loadFollowByPageRepository.loadFollowByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
