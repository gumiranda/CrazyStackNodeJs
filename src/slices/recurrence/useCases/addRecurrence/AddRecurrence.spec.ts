import { fakeRecurrenceEntity } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { RecurrenceEntity } from "@/slices/recurrence/entities";
import { AddRecurrenceRepository } from "@/slices/recurrence/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addRecurrence } from "./AddRecurrence";

describe("addRecurrence", () => {
    let testInstance: any;
    let addRecurrenceRepository: MockProxy<AddRecurrenceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addRecurrenceRepository = mock();
        addRecurrenceRepository.addRecurrence.mockResolvedValue(fakeRecurrenceEntity);
    });
    beforeEach(() => {
        testInstance = addRecurrence(addRecurrenceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addRecurrence of AddRecurrenceRepository with correct values", async () => {
        await testInstance(fakeRecurrenceEntity);
        expect(addRecurrenceRepository.addRecurrence).toHaveBeenCalledWith(
            new RecurrenceEntity(fakeRecurrenceEntity)
        );
        expect(addRecurrenceRepository.addRecurrence).toHaveBeenCalledTimes(1);
    });
    it("should return a new recurrence created when addRecurrenceRepository insert it", async () => {
        const recurrence = await testInstance(fakeRecurrenceEntity);
        expect(recurrence).toEqual(fakeRecurrenceEntity);
    });
    it("should return null a new recurrence created when addRecurrenceRepository insert it", async () => {
        addRecurrenceRepository.addRecurrence.mockResolvedValue(null);
        const recurrence = await testInstance(fakeRecurrenceEntity);
        expect(recurrence).toBeNull();
    });
    it("should rethrow if addRecurrence of AddRecurrenceRepository throws", async () => {
        addRecurrenceRepository.addRecurrence.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeRecurrenceEntity)).rejects.toThrowError("any_error");
    });
});
