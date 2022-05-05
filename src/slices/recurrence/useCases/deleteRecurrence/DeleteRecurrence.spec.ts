import { fakeRecurrenceEntity } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { RecurrenceEntity } from "@/slices/recurrence/entities";
import { DeleteRecurrenceRepository } from "@/slices/recurrence/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteRecurrence } from "./DeleteRecurrence";
import { Query } from "@/application/types";

describe("deleteRecurrence", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deleteRecurrenceRepository: MockProxy<DeleteRecurrenceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteRecurrenceRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deleteRecurrenceRepository.deleteRecurrence.mockResolvedValue(fakeRecurrenceEntity);
    });
    beforeEach(() => {
        testInstance = deleteRecurrence(deleteRecurrenceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deleteRecurrence of DeleteRecurrenceRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deleteRecurrenceRepository.deleteRecurrence).toHaveBeenCalledWith(fakeQuery);
        expect(deleteRecurrenceRepository.deleteRecurrence).toHaveBeenCalledTimes(1);
    });
    it("should return a new recurrence deleted when deleteRecurrenceRepository delete it", async () => {
        const recurrence = await testInstance(fakeQuery);
        expect(recurrence).toEqual(fakeRecurrenceEntity);
    });
    it("should return null a new recurrence deleted when deleteRecurrenceRepository delete it", async () => {
        deleteRecurrenceRepository.deleteRecurrence.mockResolvedValue(null);
        const recurrence = await testInstance(fakeRecurrenceEntity);
        expect(recurrence).toBeNull();
    });
    it("should rethrow if deleteRecurrence of DeleteRecurrenceRepository throws", async () => {
        deleteRecurrenceRepository.deleteRecurrence.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
