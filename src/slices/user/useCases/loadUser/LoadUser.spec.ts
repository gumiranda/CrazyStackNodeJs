import { LoadUserRepository } from "@/slices/user/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { LoadUser, loadUser } from "./LoadUser";

describe("LoadUser", () => {
    let fakeQuery: Query;
    let testInstance: LoadUser;
    let loadUserRepository: MockProxy<LoadUserRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadUserRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadUserRepository.loadUser.mockResolvedValue(fakeUserEntity);
    });
    beforeEach(() => {
        testInstance = loadUser(loadUserRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadUser of LoadUserRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadUserRepository.loadUser).toHaveBeenCalledWith(fakeQuery);
        expect(loadUserRepository.loadUser).toHaveBeenCalledTimes(1);
    });
    it("should return a user loaded when loadUserRepository insert it", async () => {
        const user = await testInstance(fakeQuery);
        expect(user).toEqual(fakeUserEntity);
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
});
