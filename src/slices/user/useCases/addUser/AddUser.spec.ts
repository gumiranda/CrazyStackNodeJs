import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { UserEntity } from "@/slices/user/entities";
import { AddUserRepository } from "@/slices/user/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addUser } from "./AddUser";

describe("addUser", () => {
    let testInstance: any;
    let addUserRepository: MockProxy<AddUserRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addUserRepository = mock();
        addUserRepository.addUser.mockResolvedValue(fakeUserEntity);
    });
    beforeEach(() => {
        testInstance = addUser(addUserRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addUser of AddUserRepository with correct values", async () => {
        await testInstance(fakeUserEntity);
        expect(addUserRepository.addUser).toHaveBeenCalledWith(
            new UserEntity(fakeUserEntity)
        );
        expect(addUserRepository.addUser).toHaveBeenCalledTimes(1);
    });
    it("should return a new user created when addUserRepository insert it", async () => {
        const user = await testInstance(fakeUserEntity);
        expect(user).toEqual(fakeUserEntity);
    });
    it("should return null a new user created when addUserRepository insert it", async () => {
        addUserRepository.addUser.mockResolvedValue(null);
        const user = await testInstance(fakeUserEntity);
        expect(user).toBeNull();
    });
    it("should rethrow if addUser of AddUserRepository throws", async () => {
        addUserRepository.addUser.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeUserEntity)).rejects.toThrowError("any_error");
    });
});
