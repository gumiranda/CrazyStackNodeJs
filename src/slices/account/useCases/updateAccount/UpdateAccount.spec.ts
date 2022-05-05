import { UpdateAccountRepository } from "@/slices/account/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeAccountEntity } from "@/slices/account/entities/AccountEntity.spec";
import { UpdateAccount, updateAccount } from "./UpdateAccount";

describe("UpdateAccount", () => {
    let fakeQuery: Query;
    let testInstance: UpdateAccount;
    let updateAccountRepository: MockProxy<UpdateAccountRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateAccountRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateAccountRepository.updateAccount.mockResolvedValue(fakeAccountEntity);
    });
    beforeEach(() => {
        testInstance = updateAccount(updateAccountRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateAccount of UpdateAccountRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeAccountEntity);
        expect(updateAccountRepository.updateAccount).toHaveBeenCalledWith(
            fakeQuery,
            fakeAccountEntity
        );
        expect(updateAccountRepository.updateAccount).toHaveBeenCalledTimes(1);
    });
    it("should return a account updateed when updateAccountRepository insert it", async () => {
        const account = await testInstance(fakeQuery, fakeAccountEntity);
        expect(account).toEqual(fakeAccountEntity);
    });
    it("should return null a new account updateed when updateAccountRepository return it", async () => {
        updateAccountRepository.updateAccount.mockResolvedValue(null);
        const account = await testInstance(fakeQuery, fakeAccountEntity);
        expect(account).toBeNull();
    });
    it("should rethrow if updateAccount of UpdateAccountRepository throws", async () => {
        updateAccountRepository.updateAccount.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeAccountEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
