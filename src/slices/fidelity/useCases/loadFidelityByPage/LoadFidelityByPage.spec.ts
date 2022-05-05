import { LoadFidelityByPageRepository } from "@/slices/fidelity/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeFidelityPaginated } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { LoadFidelityByPage, loadFidelityByPage } from "./LoadFidelityByPage";

describe("LoadFidelityByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadFidelityByPage;
    let loadFidelityByPageRepository: MockProxy<LoadFidelityByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadFidelityByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadFidelityByPageRepository.loadFidelityByPage.mockResolvedValue(
            fakeFidelityPaginated
        );
    });
    beforeEach(() => {
        testInstance = loadFidelityByPage(loadFidelityByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadFidelityByPage of LoadFidelityByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadFidelityByPageRepository.loadFidelityByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadFidelityByPageRepository.loadFidelityByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a fidelity loaded when loadFidelityByPageRepository insert it", async () => {
        const fidelity = await testInstance(fakeQuery);
        expect(fidelity).toEqual(fakeFidelityPaginated);
    });
    it("should return null a new fidelity loaded when loadFidelityByPageRepository return it", async () => {
        loadFidelityByPageRepository.loadFidelityByPage.mockResolvedValue(null);
        const fidelity = await testInstance(fakeQuery);
        expect(fidelity).toBeNull();
    });
    it("should rethrow if loadFidelityByPage of LoadFidelityByPageRepository throws", async () => {
        loadFidelityByPageRepository.loadFidelityByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
