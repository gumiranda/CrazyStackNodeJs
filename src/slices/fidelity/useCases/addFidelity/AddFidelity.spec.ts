import { fakeFidelityEntity } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { FidelityEntity } from "@/slices/fidelity/entities";
import { AddFidelityRepository } from "@/slices/fidelity/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addFidelity } from "./AddFidelity";

describe("addFidelity", () => {
    let testInstance: any;
    let addFidelityRepository: MockProxy<AddFidelityRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addFidelityRepository = mock();
        addFidelityRepository.addFidelity.mockResolvedValue(fakeFidelityEntity);
    });
    beforeEach(() => {
        testInstance = addFidelity(addFidelityRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addFidelity of AddFidelityRepository with correct values", async () => {
        await testInstance(fakeFidelityEntity);
        expect(addFidelityRepository.addFidelity).toHaveBeenCalledWith(
            new FidelityEntity(fakeFidelityEntity)
        );
        expect(addFidelityRepository.addFidelity).toHaveBeenCalledTimes(1);
    });
    it("should return a new fidelity created when addFidelityRepository insert it", async () => {
        const fidelity = await testInstance(fakeFidelityEntity);
        expect(fidelity).toEqual(fakeFidelityEntity);
    });
    it("should return null a new fidelity created when addFidelityRepository insert it", async () => {
        addFidelityRepository.addFidelity.mockResolvedValue(null);
        const fidelity = await testInstance(fakeFidelityEntity);
        expect(fidelity).toBeNull();
    });
    it("should rethrow if addFidelity of AddFidelityRepository throws", async () => {
        addFidelityRepository.addFidelity.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeFidelityEntity)).rejects.toThrowError("any_error");
    });
});
