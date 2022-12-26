import { LoadOwnerRepository } from "@/slices/owner/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeOwnerEntity } from "@/slices/owner/entities/OwnerEntity.spec";
import { LoadOwner, loadOwner } from "./LoadOwner";

describe("LoadOwner", () => {
    let fakeQuery: Query;
    let testInstance: LoadOwner;
    let loadOwnerRepository: MockProxy<LoadOwnerRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadOwnerRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadOwnerRepository.loadOwner.mockResolvedValue(fakeOwnerEntity);
    });
    beforeEach(() => {
        testInstance = loadOwner(loadOwnerRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadOwner of LoadOwnerRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadOwnerRepository.loadOwner).toHaveBeenCalledWith(fakeQuery);
        expect(loadOwnerRepository.loadOwner).toHaveBeenCalledTimes(1);
    });
    it("should return a owner loaded when loadOwnerRepository insert it", async () => {
        const owner = await testInstance(fakeQuery);
        expect(owner).toEqual(fakeOwnerEntity);
    });
    it("should return null a new owner loaded when loadOwnerRepository return it", async () => {
        loadOwnerRepository.loadOwner.mockResolvedValue(null);
        const owner = await testInstance(fakeQuery);
        expect(owner).toBeNull();
    });
    it("should rethrow if loadOwner of LoadOwnerRepository throws", async () => {
        loadOwnerRepository.loadOwner.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
