import { fakeRideEntity } from "@/slices/ride/entities/RideEntity.spec";
import { RideEntity } from "@/slices/ride/entities";
import { DeleteRideRepository } from "@/slices/ride/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteRide } from "./DeleteRide";
import { Query } from "@/application/types";

describe("deleteRide", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteRideRepository: MockProxy<DeleteRideRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteRideRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteRideRepository.deleteRide.mockResolvedValue(fakeRideEntity);
  });
  beforeEach(() => {
    testInstance = deleteRide(deleteRideRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteRide of DeleteRideRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteRideRepository.deleteRide).toHaveBeenCalledWith(fakeQuery);
    expect(deleteRideRepository.deleteRide).toHaveBeenCalledTimes(1);
  });
  it("should return a new ride deleted when deleteRideRepository delete it", async () => {
    const ride = await testInstance(fakeQuery);
    expect(ride).toEqual(fakeRideEntity);
  });
  it("should return null a new ride deleted when deleteRideRepository delete it", async () => {
    deleteRideRepository.deleteRide.mockResolvedValue(null);
    const ride = await testInstance(fakeRideEntity);
    expect(ride).toBeNull();
  });
  it("should rethrow if deleteRide of DeleteRideRepository throws", async () => {
    deleteRideRepository.deleteRide.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
