import { LoadOwnerByPageRepository } from "@/slices/owner/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeOwnerPaginated } from "@/slices/owner/entities/OwnerEntity.spec";
import { LoadOwnerByPage, loadOwnerByPage } from "./LoadOwnerByPage";

describe("LoadOwnerByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadOwnerByPage;
    let loadOwnerByPageRepository: MockProxy<LoadOwnerByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadOwnerByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadOwnerByPageRepository.loadOwnerByPage.mockResolvedValue(
            fakeOwnerPaginated
        );
    });
    beforeEach(() => {
        testInstance = loadOwnerByPage(loadOwnerByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadOwnerByPage of LoadOwnerByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadOwnerByPageRepository.loadOwnerByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadOwnerByPageRepository.loadOwnerByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a owner loaded when loadOwnerByPageRepository insert it", async () => {
        const owner = await testInstance(fakeQuery);
        expect(owner).toEqual(fakeOwnerPaginated);
    });
    it("should return null a new owner loaded when loadOwnerByPageRepository return it", async () => {
        loadOwnerByPageRepository.loadOwnerByPage.mockResolvedValue(null);
        const owner = await testInstance(fakeQuery);
        expect(owner).toBeNull();
    });
    it("should rethrow if loadOwnerByPage of LoadOwnerByPageRepository throws", async () => {
        loadOwnerByPageRepository.loadOwnerByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
