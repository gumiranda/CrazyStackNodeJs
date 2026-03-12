import { LoadUserRepository } from "@/slices/user/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { LoadUser, loadUser } from "./LoadUser";
import { LoadPhoto } from "@/slices/photo/useCases";

describe("LoadUser", () => {
  let fakeQuery: Query;
  let testInstance: LoadUser;
  let loadUserRepository: MockProxy<LoadUserRepository>;
  let loadPhoto: jest.Mock;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadUserRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadUserRepository.loadUser.mockResolvedValue(fakeUserEntity);
  });
  beforeEach(() => {
    loadPhoto = jest.fn().mockResolvedValue({ _id: "photo_id", url: "http://photo.com/1.jpg" });
    testInstance = loadUser(loadUserRepository, loadPhoto as unknown as LoadPhoto);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadUser of LoadUserRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadUserRepository.loadUser).toHaveBeenCalledWith(fakeQuery);
  });
  it("should return a user loaded when loadUserRepository returns it", async () => {
    const userWithoutPhoto = { ...fakeUserEntity, photoId: undefined };
    loadUserRepository.loadUser.mockResolvedValueOnce(userWithoutPhoto);
    const user = await testInstance(fakeQuery);
    expect(user).toEqual(userWithoutPhoto);
  });
  it("should return null a new user loaded when loadUserRepository return it", async () => {
    loadUserRepository.loadUser.mockResolvedValue(null);
    const user = await testInstance(fakeQuery);
    expect(user).toBeNull();
  });
  it("should rethrow if loadUser of LoadUserRepository throws", async () => {
    loadUserRepository.loadUser.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
  it("should load photo when user has photoId", async () => {
    loadUserRepository.loadUser.mockResolvedValueOnce({
      ...fakeUserEntity,
      photoId: "photo_id",
    });
    const user = await testInstance(fakeQuery);
    expect(loadPhoto).toHaveBeenCalledWith({ fields: { _id: "photo_id" } });
    expect(user).toHaveProperty("photo");
  });
  it("should not load photo when user has no photoId", async () => {
    const userWithoutPhoto = { ...fakeUserEntity, photoId: undefined };
    loadUserRepository.loadUser.mockResolvedValueOnce(userWithoutPhoto);
    await testInstance(fakeQuery);
    expect(loadPhoto).not.toHaveBeenCalled();
  });
});
