import { fakeFidelityEntity } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { FidelityEntity } from "@/slices/fidelity/entities";
import { DeleteFidelityRepository } from "@/slices/fidelity/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteFidelity } from "./DeleteFidelity";
import { Query } from "@/application/types";

describe("deleteFidelity", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deleteFidelityRepository: MockProxy<DeleteFidelityRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteFidelityRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deleteFidelityRepository.deleteFidelity.mockResolvedValue(fakeFidelityEntity);
    });
    beforeEach(() => {
        testInstance = deleteFidelity(deleteFidelityRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deleteFidelity of DeleteFidelityRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deleteFidelityRepository.deleteFidelity).toHaveBeenCalledWith(fakeQuery);
        expect(deleteFidelityRepository.deleteFidelity).toHaveBeenCalledTimes(1);
    });
    it("should return a new fidelity deleted when deleteFidelityRepository delete it", async () => {
        const fidelity = await testInstance(fakeQuery);
        expect(fidelity).toEqual(fakeFidelityEntity);
    });
    it("should return null a new fidelity deleted when deleteFidelityRepository delete it", async () => {
        deleteFidelityRepository.deleteFidelity.mockResolvedValue(null);
        const fidelity = await testInstance(fakeFidelityEntity);
        expect(fidelity).toBeNull();
    });
    it("should rethrow if deleteFidelity of DeleteFidelityRepository throws", async () => {
        deleteFidelityRepository.deleteFidelity.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
