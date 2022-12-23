import { UpdateFidelityRepository } from "@/slices/fidelity/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeFidelityEntity } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { UpdateFidelity, updateFidelity } from "./UpdateFidelity";

describe("UpdateFidelity", () => {
  let fakeQuery: Query;
  let testInstance: UpdateFidelity;
  let updateFidelityRepository: MockProxy<UpdateFidelityRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateFidelityRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateFidelityRepository.updateFidelity.mockResolvedValue(fakeFidelityEntity);
  });
  beforeEach(() => {
    testInstance = updateFidelity(updateFidelityRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateFidelity of UpdateFidelityRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeFidelityEntity);
    expect(updateFidelityRepository.updateFidelity).toHaveBeenCalledWith(
      fakeQuery,
      fakeFidelityEntity
    );
    expect(updateFidelityRepository.updateFidelity).toHaveBeenCalledTimes(1);
  });
  it("should return a fidelity updateed when updateFidelityRepository insert it", async () => {
    const fidelity = await testInstance(fakeQuery, fakeFidelityEntity);
    expect(fidelity).toEqual(fakeFidelityEntity);
  });
  it("should return null a new fidelity updateed when updateFidelityRepository return it", async () => {
    updateFidelityRepository.updateFidelity.mockResolvedValue(null);
    const fidelity = await testInstance(fakeQuery, fakeFidelityEntity);
    expect(fidelity).toBeNull();
  });
  it("should rethrow if updateFidelity of UpdateFidelityRepository throws", async () => {
    updateFidelityRepository.updateFidelity.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeFidelityEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
