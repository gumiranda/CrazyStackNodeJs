import { LoadAvailableTimesRepository } from "@/slices/appointment/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import {
    AvailableTimesModelRepository,
    QueryAvailableTimesRepository,
} from "@/slices/appointment/entities";
import { fakeAvailableTimesEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { LoadAvailableTimes, loadAvailableTimes } from "./LoadAvailableTimes";
import { endOfDay, formatISO, startOfDay } from "@/application/helpers/dateFns";

describe("LoadAvailableTimes", () => {
    let fakeQuery: QueryAvailableTimesRepository;
    let testInstance: LoadAvailableTimes;
    let loadAvailableTimesRepository: MockProxy<LoadAvailableTimesRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadAvailableTimesRepository = mock();
        fakeQuery = {
            endDay: formatISO(endOfDay(new Date(2021, 10, 10, 10))),
            initDay: formatISO(startOfDay(new Date(2021, 10, 10, 10))),
            professionalId: "123",
        };
        loadAvailableTimesRepository.loadAvailableTimes.mockResolvedValue(
            fakeAvailableTimesEntity
        );
    });
    beforeEach(() => {
        testInstance = loadAvailableTimes(loadAvailableTimesRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadAvailableTimes of LoadAvailableTimesRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadAvailableTimesRepository.loadAvailableTimes).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadAvailableTimesRepository.loadAvailableTimes).toHaveBeenCalledTimes(1);
    });
    it("should return a availabletimes loaded when loadAvailableTimesRepository insert it", async () => {
        const availabletimes = await testInstance(fakeQuery);
        expect(availabletimes).toEqual(fakeAvailableTimesEntity);
    });
    it("should return null a new availabletimes loaded when loadAvailableTimesRepository return it", async () => {
        loadAvailableTimesRepository.loadAvailableTimes.mockResolvedValue(null);
        const availabletimes = await testInstance(fakeQuery);
        expect(availabletimes).toBeNull();
    });
    it("should rethrow if loadAvailableTimes of LoadAvailableTimesRepository throws", async () => {
        loadAvailableTimesRepository.loadAvailableTimes.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
