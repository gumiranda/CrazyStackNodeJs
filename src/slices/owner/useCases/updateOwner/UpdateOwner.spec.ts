import { UpdateOwnerRepository } from "@/slices/owner/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeOwnerEntity } from "@/slices/owner/entities/OwnerEntity.spec";
import { UpdateOwner, updateOwner } from "./UpdateOwner";

describe("UpdateOwner", () => {
    let fakeQuery: Query;
    let testInstance: UpdateOwner;
    let updateOwnerRepository: MockProxy<UpdateOwnerRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateOwnerRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateOwnerRepository.updateOwner.mockResolvedValue(fakeOwnerEntity);
    });
    beforeEach(() => {
        testInstance = updateOwner(updateOwnerRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateOwner of UpdateOwnerRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeOwnerEntity);
        expect(updateOwnerRepository.updateOwner).toHaveBeenCalledWith(
            fakeQuery,
            fakeOwnerEntity
        );
        expect(updateOwnerRepository.updateOwner).toHaveBeenCalledTimes(1);
    });
    it("should return a owner updateed when updateOwnerRepository insert it", async () => {
        const owner = await testInstance(fakeQuery, fakeOwnerEntity);
        expect(owner).toEqual(fakeOwnerEntity);
    });
    it("should return null a new owner updateed when updateOwnerRepository return it", async () => {
        updateOwnerRepository.updateOwner.mockResolvedValue(null);
        const owner = await testInstance(fakeQuery, fakeOwnerEntity);
        expect(owner).toBeNull();
    });
    it("should rethrow if updateOwner of UpdateOwnerRepository throws", async () => {
        updateOwnerRepository.updateOwner.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeOwnerEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
