import { fakeRideEntity } from "@/slices/ride/entities/RideEntity.spec";
import { RideEntity } from "@/slices/ride/entities";
import { AddRideRepository } from "@/slices/ride/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addRide } from "./AddRide";

describe("addRide", () => {
    let testInstance: any;
    let addRideRepository: MockProxy<AddRideRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addRideRepository = mock();
        addRideRepository.addRide.mockResolvedValue(fakeRideEntity);
    });
    beforeEach(() => {
        testInstance = addRide(addRideRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addRide of AddRideRepository with correct values", async () => {
        await testInstance(fakeRideEntity);
        expect(addRideRepository.addRide).toHaveBeenCalledWith(
            new RideEntity(fakeRideEntity)
        );
        expect(addRideRepository.addRide).toHaveBeenCalledTimes(1);
    });
    it("should return a new ride created when addRideRepository insert it", async () => {
        const ride = await testInstance(fakeRideEntity);
        expect(ride).toEqual(fakeRideEntity);
    });
    it("should return null a new ride created when addRideRepository insert it", async () => {
        addRideRepository.addRide.mockResolvedValue(null);
        const ride = await testInstance(fakeRideEntity);
        expect(ride).toBeNull();
    });
    it("should rethrow if addRide of AddRideRepository throws", async () => {
        addRideRepository.addRide.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeRideEntity)).rejects.toThrowError("any_error");
    });
});
