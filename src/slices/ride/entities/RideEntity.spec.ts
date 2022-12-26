import { RideEntity } from "./RideEntity";
import MockDate from "mockdate";

export const fakeRideEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeRideEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    requestId: "fakeRequestId",
    driverUserType: "owner",
    origin: [43.111, 22.2222],
    destiny: [43.111, 22.2222],
    status: 0,
    distance: 0,
    distanceTime: 0,
    maxCostEstimated: 0,
    minCostEstimated: 0,
    finalCost: 0,
    costDefinedByOwner: 0,
    initDate: new Date(),
    endDateEstimated: new Date(),
    endDate: new Date(),
};
export const fakeRidePaginated = {
    total: 11,
    rides: [
        fakeRideEntity,
        fakeRideEntity,
        fakeRideEntity,
        fakeRideEntity,
        fakeRideEntity,
        fakeRideEntity,
        fakeRideEntity,
        fakeRideEntity,
        fakeRideEntity,
        fakeRideEntity,
        fakeRideEntity,
    ],
};

describe("Ride", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new RideEntity(fakeRideEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeRideEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
