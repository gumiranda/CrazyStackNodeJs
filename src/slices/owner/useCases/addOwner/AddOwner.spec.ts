import { fakeOwnerEntity } from "@/slices/owner/entities/OwnerEntity.spec";
import { OwnerEntity } from "@/slices/owner/entities";
import { AddOwnerRepository } from "@/slices/owner/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addOwner } from "./AddOwner";

describe("addOwner", () => {
    let testInstance: any;
    let addOwnerRepository: MockProxy<AddOwnerRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addOwnerRepository = mock();
        addOwnerRepository.addOwner.mockResolvedValue(fakeOwnerEntity);
    });
    beforeEach(() => {
        testInstance = addOwner(addOwnerRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addOwner of AddOwnerRepository with correct values", async () => {
        await testInstance(fakeOwnerEntity);
        expect(addOwnerRepository.addOwner).toHaveBeenCalledWith(
            new OwnerEntity(fakeOwnerEntity)
        );
        expect(addOwnerRepository.addOwner).toHaveBeenCalledTimes(1);
    });
    it("should return a new owner created when addOwnerRepository insert it", async () => {
        const owner = await testInstance(fakeOwnerEntity);
        expect(owner).toEqual(fakeOwnerEntity);
    });
    it("should return null a new owner created when addOwnerRepository insert it", async () => {
        addOwnerRepository.addOwner.mockResolvedValue(null);
        const owner = await testInstance(fakeOwnerEntity);
        expect(owner).toBeNull();
    });
    it("should rethrow if addOwner of AddOwnerRepository throws", async () => {
        addOwnerRepository.addOwner.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeOwnerEntity)).rejects.toThrowError("any_error");
    });
});
