import { LoadAccountByPageRepository } from "@/slices/account/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeAccountPaginated } from "@/slices/account/entities/AccountEntity.spec";
import { LoadAccountByPage, loadAccountByPage } from "./LoadAccountByPage";

describe("LoadAccountByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadAccountByPage;
    let loadAccountByPageRepository: MockProxy<LoadAccountByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadAccountByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadAccountByPageRepository.loadAccountByPage.mockResolvedValue(
            fakeAccountPaginated
        );
    });
    beforeEach(() => {
        testInstance = loadAccountByPage(loadAccountByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadAccountByPage of LoadAccountByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadAccountByPageRepository.loadAccountByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadAccountByPageRepository.loadAccountByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a account loaded when loadAccountByPageRepository insert it", async () => {
        const account = await testInstance(fakeQuery);
        expect(account).toEqual(fakeAccountPaginated);
    });
    it("should return null a new account loaded when loadAccountByPageRepository return it", async () => {
        loadAccountByPageRepository.loadAccountByPage.mockResolvedValue(null);
        const account = await testInstance(fakeQuery);
        expect(account).toBeNull();
    });
    it("should rethrow if loadAccountByPage of LoadAccountByPageRepository throws", async () => {
        loadAccountByPageRepository.loadAccountByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
