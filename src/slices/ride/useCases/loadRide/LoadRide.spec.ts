import { LoadRideRepository } from "@/slices/ride/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRideEntity } from "@/slices/ride/entities/RideEntity.spec";
import { LoadRide, loadRide } from "./LoadRide";

describe("LoadRide", () => {
    let fakeQuery: Query;
    let testInstance: LoadRide;
    let loadRideRepository: MockProxy<LoadRideRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadRideRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadRideRepository.loadRide.mockResolvedValue(fakeRideEntity);
    });
    beforeEach(() => {
        testInstance = loadRide(loadRideRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadRide of LoadRideRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadRideRepository.loadRide).toHaveBeenCalledWith(fakeQuery);
        expect(loadRideRepository.loadRide).toHaveBeenCalledTimes(1);
    });
    it("should return a ride loaded when loadRideRepository insert it", async () => {
        const ride = await testInstance(fakeQuery);
        expect(ride).toEqual(fakeRideEntity);
    });
    it("should return null a new ride loaded when loadRideRepository return it", async () => {
        loadRideRepository.loadRide.mockResolvedValue(null);
        const ride = await testInstance(fakeQuery);
        expect(ride).toBeNull();
    });
    it("should rethrow if loadRide of LoadRideRepository throws", async () => {
        loadRideRepository.loadRide.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
