import { LoadFidelityRepository } from "@/slices/fidelity/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeFidelityEntity } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { LoadFidelity, loadFidelity } from "./LoadFidelity";

describe("LoadFidelity", () => {
    let fakeQuery: Query;
    let testInstance: LoadFidelity;
    let loadFidelityRepository: MockProxy<LoadFidelityRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadFidelityRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadFidelityRepository.loadFidelity.mockResolvedValue(fakeFidelityEntity);
    });
    beforeEach(() => {
        testInstance = loadFidelity(loadFidelityRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadFidelity of LoadFidelityRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadFidelityRepository.loadFidelity).toHaveBeenCalledWith(fakeQuery);
        expect(loadFidelityRepository.loadFidelity).toHaveBeenCalledTimes(1);
    });
    it("should return a fidelity loaded when loadFidelityRepository insert it", async () => {
        const fidelity = await testInstance(fakeQuery);
        expect(fidelity).toEqual(fakeFidelityEntity);
    });
    it("should return null a new fidelity loaded when loadFidelityRepository return it", async () => {
        loadFidelityRepository.loadFidelity.mockResolvedValue(null);
        const fidelity = await testInstance(fakeQuery);
        expect(fidelity).toBeNull();
    });
    it("should rethrow if loadFidelity of LoadFidelityRepository throws", async () => {
        loadFidelityRepository.loadFidelity.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
