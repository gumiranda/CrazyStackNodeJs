import { LoadAccountRepository } from "@/slices/account/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeAccountEntity } from "@/slices/account/entities/AccountEntity.spec";
import { LoadAccount, loadAccount } from "./LoadAccount";

describe("LoadAccount", () => {
    let fakeQuery: Query;
    let testInstance: LoadAccount;
    let loadAccountRepository: MockProxy<LoadAccountRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadAccountRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadAccountRepository.loadAccount.mockResolvedValue(fakeAccountEntity);
    });
    beforeEach(() => {
        testInstance = loadAccount(loadAccountRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadAccount of LoadAccountRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadAccountRepository.loadAccount).toHaveBeenCalledWith(fakeQuery);
        expect(loadAccountRepository.loadAccount).toHaveBeenCalledTimes(1);
    });
    it("should return a account loaded when loadAccountRepository insert it", async () => {
        const account = await testInstance(fakeQuery);
        expect(account).toEqual(fakeAccountEntity);
    });
    it("should return null a new account loaded when loadAccountRepository return it", async () => {
        loadAccountRepository.loadAccount.mockResolvedValue(null);
        const account = await testInstance(fakeQuery);
        expect(account).toBeNull();
    });
    it("should rethrow if loadAccount of LoadAccountRepository throws", async () => {
        loadAccountRepository.loadAccount.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
