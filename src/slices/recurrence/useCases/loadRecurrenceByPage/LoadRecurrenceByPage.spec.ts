import { LoadRecurrenceByPageRepository } from "@/slices/recurrence/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRecurrencePaginated } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { LoadRecurrenceByPage, loadRecurrenceByPage } from "./LoadRecurrenceByPage";

describe("LoadRecurrenceByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadRecurrenceByPage;
    let loadRecurrenceByPageRepository: MockProxy<LoadRecurrenceByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadRecurrenceByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadRecurrenceByPageRepository.loadRecurrenceByPage.mockResolvedValue(
            fakeRecurrencePaginated
        );
    });
    beforeEach(() => {
        testInstance = loadRecurrenceByPage(loadRecurrenceByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadRecurrenceByPage of LoadRecurrenceByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadRecurrenceByPageRepository.loadRecurrenceByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadRecurrenceByPageRepository.loadRecurrenceByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a recurrence loaded when loadRecurrenceByPageRepository insert it", async () => {
        const recurrence = await testInstance(fakeQuery);
        expect(recurrence).toEqual(fakeRecurrencePaginated);
    });
    it("should return null a new recurrence loaded when loadRecurrenceByPageRepository return it", async () => {
        loadRecurrenceByPageRepository.loadRecurrenceByPage.mockResolvedValue(null);
        const recurrence = await testInstance(fakeQuery);
        expect(recurrence).toBeNull();
    });
    it("should rethrow if loadRecurrenceByPage of LoadRecurrenceByPageRepository throws", async () => {
        loadRecurrenceByPageRepository.loadRecurrenceByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
