import { LoadAvailableTimesRepository } from "@/slices/appointment/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import {
    AvailableTimesModelRepository,
    QueryAvailableTimes,
    QueryAvailableTimesRepository,
} from "@/slices/appointment/entities";
import { fakeAvailableTimesEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { LoadAvailableTimes, loadAvailableTimes } from "./LoadAvailableTimes";
import { endOfDay, formatISO, startOfDay } from "@/application/helpers/dateFns";
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
});
