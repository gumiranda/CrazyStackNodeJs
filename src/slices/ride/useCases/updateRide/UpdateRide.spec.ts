import { UpdateRideRepository } from "@/slices/ride/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRideEntity } from "@/slices/ride/entities/RideEntity.spec";
import { UpdateRide, updateRide } from "./UpdateRide";

describe("UpdateRide", () => {
  let fakeQuery: Query;
  let testInstance: UpdateRide;
  let updateRideRepository: MockProxy<UpdateRideRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateRideRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateRideRepository.updateRide.mockResolvedValue(fakeRideEntity);
  });
  beforeEach(() => {
    testInstance = updateRide(updateRideRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateRide of UpdateRideRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeRideEntity);
    expect(updateRideRepository.updateRide).toHaveBeenCalledWith(
      fakeQuery,
      fakeRideEntity
    );
    expect(updateRideRepository.updateRide).toHaveBeenCalledTimes(1);
  });
  it("should return a ride updateed when updateRideRepository insert it", async () => {
    const ride = await testInstance(fakeQuery, fakeRideEntity);
    expect(ride).toEqual(fakeRideEntity);
  });
  it("should return null a new ride updateed when updateRideRepository return it", async () => {
    updateRideRepository.updateRide.mockResolvedValue(null);
    const ride = await testInstance(fakeQuery, fakeRideEntity);
    expect(ride).toBeNull();
  });
  it("should rethrow if updateRide of UpdateRideRepository throws", async () => {
    updateRideRepository.updateRide.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeRideEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
