import { LoadAvailableTimesRepository } from "@/slices/appointment/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import {
    QueryAvailableTimes,
    QueryAvailableTimesRepository,
} from "@/slices/appointment/entities";
import { fakeAvailableTimesEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { LoadAvailableTimes, loadAvailableTimes } from "./LoadAvailableTimes";
import { LoadServiceRepository } from "@/slices/service/repositories";
import { LoadUserRepository } from "@/slices/user/repositories";
import { LoadOwnerRepository } from "@/slices/owner/repositories";
import { queryDateGenerator } from "@/application/helpers/date";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { fakeOwnerEntity } from "@/slices/owner/entities/OwnerEntity.spec";
import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";

describe("LoadAvailableTimes", () => {
    let fakeQueryAvailableTimesRepository: QueryAvailableTimesRepository;
    let fakeQueryAvailableTimes: QueryAvailableTimes;
    let testInstance: LoadAvailableTimes;
    let loadAvailableTimesRepository: MockProxy<LoadAvailableTimesRepository>;
    let serviceRepository: MockProxy<LoadServiceRepository>;
    let userRepository: MockProxy<LoadUserRepository>;
    let ownerRepository: MockProxy<LoadOwnerRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadAvailableTimesRepository = mock();
        serviceRepository = mock();
        userRepository = mock();
        ownerRepository = mock();
        fakeQueryAvailableTimesRepository = {
            endDay: queryDateGenerator(new Date().toISOString())?.endDay,
            initDay: queryDateGenerator(new Date().toISOString())?.initDay,
            professionalId: "fakeUserId",
        };
        fakeQueryAvailableTimes = {
            professionalId: "fakeUserId",
            serviceId: "fakeServiceId",
            ownerId: "fakeUserId",
            date: new Date().toISOString(),
        };
        loadAvailableTimesRepository.loadAvailableTimes.mockResolvedValue(
            fakeAvailableTimesEntity
        );
        userRepository.loadUser.mockResolvedValue(fakeUserEntity);
        ownerRepository.loadOwner.mockResolvedValue(fakeOwnerEntity);
        serviceRepository.loadService.mockResolvedValue(fakeServiceEntity);
    });
    beforeEach(() => {
        testInstance = loadAvailableTimes(
            loadAvailableTimesRepository,
            serviceRepository,
            userRepository,
            ownerRepository
        );
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call load of LoadAvailableTimesRepository with correct values", async () => {
        await testInstance(fakeQueryAvailableTimes);
        expect(loadAvailableTimesRepository.loadAvailableTimes).toHaveBeenCalledWith(
            fakeQueryAvailableTimesRepository
        );
        expect(loadAvailableTimesRepository.loadAvailableTimes).toHaveBeenCalledTimes(1);
    });
    it("if i pass date in past, should return null", async () => {
        const res = await testInstance({
            ...fakeQueryAvailableTimes,
            date: new Date(1998, 8, 8, 8, 8).toISOString(),
        });
        expect(res).toBeNull();
    });
    it("if i pass date null, should return null", async () => {
        const res = await testInstance({
            ...fakeQueryAvailableTimes,
            date: null,
        });
        expect(res).toBeNull();
    });
    it("should rethrow if load of LoadAvailableTimesRepository throws", async () => {
        loadAvailableTimesRepository.loadAvailableTimes.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQueryAvailableTimes)).rejects.toThrow("any_error");
    });
    it("should return null if loadAvailableTimes return null", async () => {
        loadAvailableTimesRepository.loadAvailableTimes.mockResolvedValueOnce(null);
        const appointment = await testInstance(fakeQueryAvailableTimes);
        expect(appointment).toEqual({ timeAvailable: [], timeAvailableProfessional: [] });
    });
    it("should return null if load of loadOwner returns null", async () => {
        loadAvailableTimesRepository.loadAvailableTimes.mockResolvedValueOnce(null);
        ownerRepository.loadOwner.mockResolvedValueOnce(null);
        const appointment = await testInstance(fakeQueryAvailableTimes);
        expect(appointment).toBeNull();
    });
    it("should return null if load of loadService returns null", async () => {
        serviceRepository.loadService.mockResolvedValueOnce(null);
        const appointment = await testInstance(fakeQueryAvailableTimes);
        expect(appointment).toBeNull();
    });
    it("should return null if load of loadUser returns null", async () => {
        loadAvailableTimesRepository.loadAvailableTimes.mockResolvedValueOnce(null);
        userRepository.loadUser.mockResolvedValueOnce(null);
        const appointment = await testInstance(fakeQueryAvailableTimes);
        expect(appointment).toBeNull();
    });
    it("should return null testInstance returns null", async () => {
        const appointment = await testInstance(null as any);
        expect(appointment).toBeNull();
    });
});
