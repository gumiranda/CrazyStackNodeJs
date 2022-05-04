import { UpdateUserRepository } from "@/slices/user/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { UpdateUser, updateUser } from "./UpdateUser";

describe("UpdateUser", () => {
    let fakeQuery: Query;
    let testInstance: UpdateUser;
    let updateUserRepository: MockProxy<UpdateUserRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateUserRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateUserRepository.updateUser.mockResolvedValue(fakeUserEntity);
    });
    beforeEach(() => {
        testInstance = updateUser(updateUserRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateUser of UpdateUserRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeUserEntity);
        expect(updateUserRepository.updateUser).toHaveBeenCalledWith(
            fakeQuery,
            fakeUserEntity
        );
        expect(updateUserRepository.updateUser).toHaveBeenCalledTimes(1);
    });
    it("should return a user updateed when updateUserRepository insert it", async () => {
        const user = await testInstance(fakeQuery, fakeUserEntity);
        expect(user).toEqual(fakeUserEntity);
    });
    it("should return null a new user updateed when updateUserRepository return it", async () => {
        updateUserRepository.updateUser.mockResolvedValue(null);
        const user = await testInstance(fakeQuery, fakeUserEntity);
        expect(user).toBeNull();
    });
    it("should rethrow if updateUser of UpdateUserRepository throws", async () => {
        updateUserRepository.updateUser.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeUserEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
