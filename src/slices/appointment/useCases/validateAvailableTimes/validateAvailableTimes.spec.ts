import {
    fakeAvailableTimesEntity as fakeAvailableTimesModelRepository,
    fakeAvailableTimesModel2,
    fakeAvailableTimesModel,
    fakeQueryVerifyAvailableTimes,
} from "@/slices/appointment/entities/AppointmentEntity.spec";

import {
    LoadAvailableTimes,
    loadAvailableTimes,
} from "@/slices/appointment/useCases/loadAvailableTimes";
import {
    ValidateAvailableTimes,
    validateAvailableTimes,
} from "@/slices/appointment/useCases/validateAvailableTimes";
import MockDate from "mockdate";
import { LoadServiceRepository } from "@/slices/service/repositories";
import { LoadUserRepository } from "@/slices/user/repositories";
import { LoadOwnerRepository } from "@/slices/owner/repositories";
import { LoadAvailableTimesRepository } from "@/slices/appointment/repositories";
import { mock, MockProxy } from "jest-mock-extended";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { fakeOwnerEntity } from "@/slices/owner/entities/OwnerEntity.spec";
import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";

describe("ValidateAvailableTimes", () => {
    let testInstance: ValidateAvailableTimes;
    let testLoadAvailableTimes: LoadAvailableTimes;
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
        userRepository.loadUser.mockResolvedValue(fakeUserEntity);
        ownerRepository.loadOwner.mockResolvedValue(fakeOwnerEntity);
        serviceRepository.loadService.mockResolvedValue(fakeServiceEntity);
        loadAvailableTimesRepository.loadAvailableTimes.mockResolvedValue(
            fakeAvailableTimesModelRepository
        );
    });
    beforeEach(() => {
        testLoadAvailableTimes = loadAvailableTimes(
            loadAvailableTimesRepository,
            serviceRepository,
            userRepository,
            ownerRepository
        );
        testInstance = validateAvailableTimes(testLoadAvailableTimes);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should return true if i have available times", async () => {
        testInstance = validateAvailableTimes(
            jest.fn().mockImplementation((query) => fakeAvailableTimesModel)
        );
        const appointment = await testInstance({
            professionalId: "fakeUserId",
            date: new Date(2021, 9, 14, 3, 0).toISOString(),
            serviceId: "fakeServiceId",
            ownerId: "fakeOwnerId",
            initDate: "2021-10-14T11:00:00.000Z",
            endDate: "2021-10-14T11:30:00.000Z",
        });
        expect(appointment).toBeTruthy();
    });
    it("should return false if i pass null as param", async () => {
        testInstance = validateAvailableTimes(
            jest.fn().mockImplementation((query) => fakeAvailableTimesModel)
        );
        const appointment = await testInstance(null as any);
        expect(appointment).toBe(false);
    });
    it("should return false if pass endDate <= initDate", async () => {
        testInstance = validateAvailableTimes(
            jest.fn().mockImplementation((query) => fakeAvailableTimesModel)
        );
        const appointment = await testInstance({
            professionalId: "fakeUserId",
            date: new Date(2021, 9, 14, 3, 0).toISOString(),
            serviceId: "fakeServiceId",
            ownerId: "fakeOwnerId",
            initDate: "2021-10-14T14:00:00.000Z",
            endDate: "2021-10-14T11:30:00.000Z",
        });
        expect(appointment).toBe(false);
    });
    it("should return false if loadAvailableTimes returns null", async () => {
        testInstance = validateAvailableTimes(
            jest.fn().mockImplementation((query) => null)
        );
        const appointment = await testInstance({
            professionalId: "fakeUserId",
            date: new Date(2021, 9, 14, 3, 0).toISOString(),
            serviceId: "fakeServiceId",
            ownerId: "fakeOwnerId",
            initDate: "2021-10-14T11:00:00.000Z",
            endDate: "2021-10-14T11:30:00.000Z",
        });
        expect(appointment).toBe(false);
    });
    it("should return true if i have time available", async () => {
        testInstance = validateAvailableTimes(
            jest.fn().mockImplementation((query) => fakeAvailableTimesModel2)
        );
        const appointment = await testInstance({
            professionalId: "fakeUserId",
            date: new Date(2021, 9, 14, 3, 0).toISOString(),
            serviceId: "fakeServiceId",
            ownerId: "fakeOwnerId",
            initDate: "2021-10-14T11:00:00.000Z",
            endDate: "2021-10-14T11:30:00.000Z",
        });
        expect(appointment).toBe(true);
    });
    it("should return false if i haven`t time available", async () => {
        testInstance = validateAvailableTimes(
            jest.fn().mockImplementation((query) => fakeAvailableTimesModel)
        );
        const appointment = await testInstance({
            professionalId: "fakeUserId",
            date: new Date(2021, 9, 14, 3, 0).toISOString(),
            serviceId: "fakeServiceId",
            ownerId: "fakeOwnerId",
            initDate: "2021-10-14T04:00:00.000Z",
            endDate: "2021-10-14T04:30:00.000Z",
        });
        expect(appointment).toBe(false);
    });
});
