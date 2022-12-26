import { LoadRideByPageRepository } from "@/slices/ride/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRidePaginated } from "@/slices/ride/entities/RideEntity.spec";
import { LoadRideByPage, loadRideByPage } from "./LoadRideByPage";

describe("LoadRideByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadRideByPage;
    let loadRideByPageRepository: MockProxy<LoadRideByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadRideByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadRideByPageRepository.loadRideByPage.mockResolvedValue(
            fakeRidePaginated
        );
    });
    beforeEach(() => {
        testInstance = loadRideByPage(loadRideByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadRideByPage of LoadRideByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadRideByPageRepository.loadRideByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadRideByPageRepository.loadRideByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a ride loaded when loadRideByPageRepository insert it", async () => {
        const ride = await testInstance(fakeQuery);
        expect(ride).toEqual(fakeRidePaginated);
    });
    it("should return null a new ride loaded when loadRideByPageRepository return it", async () => {
        loadRideByPageRepository.loadRideByPage.mockResolvedValue(null);
        const ride = await testInstance(fakeQuery);
        expect(ride).toBeNull();
    });
    it("should rethrow if loadRideByPage of LoadRideByPageRepository throws", async () => {
        loadRideByPageRepository.loadRideByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
