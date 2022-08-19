import { LoadUserByPageGeoNearRepository } from "@/slices/user/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeUserPaginated } from "@/slices/user/entities/UserEntity.spec";
import { LoadUserByPageGeoNear, loadUserByPageGeoNear } from "./LoadUserByPageGeoNear";

describe("LoadUserByPageGeoNear", () => {
    let fakeQuery: Query;
    let testInstance: LoadUserByPageGeoNear;
    let loadUserByPageGeoNearRepository: MockProxy<LoadUserByPageGeoNearRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadUserByPageGeoNearRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadUserByPageGeoNearRepository.loadUserByPageGeoNear.mockResolvedValue(
            fakeUserPaginated
        );
    });
    beforeEach(() => {
        testInstance = loadUserByPageGeoNear(loadUserByPageGeoNearRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadUserByPageGeoNear of LoadUserByPageGeoNearRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadUserByPageGeoNearRepository.loadUserByPageGeoNear).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(
            loadUserByPageGeoNearRepository.loadUserByPageGeoNear
        ).toHaveBeenCalledTimes(1);
    });
    it("should return a user loaded when loadUserByPageGeoNearRepository insert it", async () => {
        const user = await testInstance(fakeQuery);
        expect(user).toEqual(fakeUserPaginated);
    });
    it("should return null a new user loaded when loadUserByPageGeoNearRepository return it", async () => {
        loadUserByPageGeoNearRepository.loadUserByPageGeoNear.mockResolvedValue(null);
        const user = await testInstance(fakeQuery);
        expect(user).toBeNull();
    });
    it("should rethrow if loadUserByPageGeoNear of LoadUserByPageGeoNearRepository throws", async () => {
        loadUserByPageGeoNearRepository.loadUserByPageGeoNear.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
