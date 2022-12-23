import { UpdateRecurrenceRepository } from "@/slices/recurrence/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRecurrenceEntity } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { UpdateRecurrence, updateRecurrence } from "./UpdateRecurrence";

describe("UpdateRecurrence", () => {
  let fakeQuery: Query;
  let testInstance: UpdateRecurrence;
  let updateRecurrenceRepository: MockProxy<UpdateRecurrenceRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateRecurrenceRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateRecurrenceRepository.updateRecurrence.mockResolvedValue(fakeRecurrenceEntity);
  });
  beforeEach(() => {
    testInstance = updateRecurrence(updateRecurrenceRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateRecurrence of UpdateRecurrenceRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeRecurrenceEntity);
    expect(updateRecurrenceRepository.updateRecurrence).toHaveBeenCalledWith(
      fakeQuery,
      fakeRecurrenceEntity
    );
    expect(updateRecurrenceRepository.updateRecurrence).toHaveBeenCalledTimes(1);
  });
  it("should return a recurrence updateed when updateRecurrenceRepository insert it", async () => {
    const recurrence = await testInstance(fakeQuery, fakeRecurrenceEntity);
    expect(recurrence).toEqual(fakeRecurrenceEntity);
  });
  it("should return null a new recurrence updateed when updateRecurrenceRepository return it", async () => {
    updateRecurrenceRepository.updateRecurrence.mockResolvedValue(null);
    const recurrence = await testInstance(fakeQuery, fakeRecurrenceEntity);
    expect(recurrence).toBeNull();
  });
  it("should rethrow if updateRecurrence of UpdateRecurrenceRepository throws", async () => {
    updateRecurrenceRepository.updateRecurrence.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery, fakeRecurrenceEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
