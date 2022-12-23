import { fakeAvailableTimesModel } from "./../entities/AppointmentEntity.spec";
import {
  fakeAppointmentEntity,
  fakeAppointmentPaginated,
  fakeAvailableTimesEntity,
  fakeQueryAvailableTimesRepository,
} from "@/slices/appointment/entities/AppointmentEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { AppointmentRepository } from "./appointmentRepository";
import { ObjectId } from "mongodb";

describe("Appointment Mongo Repository", () => {
  let fakeQuery: Query;
  let fakeId: string;
  let testInstance: AppointmentRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeId = new ObjectId().toString();
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeAppointmentEntity);
    repository.getOne.mockResolvedValue(fakeAppointmentEntity);
    repository.update.mockResolvedValue(fakeAppointmentEntity);
    repository.getPaginate.mockResolvedValue(fakeAppointmentPaginated?.appointments);
    repository.getCount.mockResolvedValue(fakeAppointmentPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
    repository.aggregate.mockResolvedValue([fakeAvailableTimesEntity]);
  });
  beforeEach(async () => {
    testInstance = new AppointmentRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addAppointment with correct values", async () => {
    await testInstance.addAppointment(fakeAppointmentEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeAppointmentEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new appointment created when addAppointment insert it", async () => {
    const result = await testInstance.addAppointment(fakeAppointmentEntity);
    expect(result).toEqual(fakeAppointmentEntity);
  });
  test("should return null when addAppointment returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addAppointment(fakeAppointmentEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addAppointment throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addAppointment(fakeAppointmentEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateAppointment throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateAppointment(fakeQuery, fakeAppointmentEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateAppointment with correct values", async () => {
    await testInstance.updateAppointment(fakeQuery, fakeAppointmentEntity);
    expect(repository.update).toHaveBeenCalledWith(
      fakeQuery?.fields,
      fakeAppointmentEntity
    );
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a appointment updated when updateAppointment update it", async () => {
    const result = await testInstance.updateAppointment(fakeQuery, fakeAppointmentEntity);
    expect(result).toEqual(fakeAppointmentEntity);
  });
  test("should return a appointment updated when updateAppointment update it when i pass null", async () => {
    const result = await testInstance.updateAppointment(
      null as any,
      fakeAppointmentEntity
    );
    expect(result).toEqual(fakeAppointmentEntity);
  });
  test("should return null when updateAppointment returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateAppointment(fakeQuery, fakeAppointmentEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateAppointment throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateAppointment(fakeQuery, fakeAppointmentEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteAppointment with correct values", async () => {
    await testInstance.deleteAppointment(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new appointment created when deleteAppointment insert it", async () => {
    const result = await testInstance.deleteAppointment(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteAppointment returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteAppointment(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteAppointment throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteAppointment(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadAppointment with correct values", async () => {
    await testInstance.loadAppointment(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a appointment when loadAppointment loaded it", async () => {
    const result = await testInstance.loadAppointment(fakeQuery);
    expect(result).toEqual(fakeAppointmentEntity);
  });
  test("should return null when loadAppointment returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadAppointment(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadAppointment returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadAppointment(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadAppointment throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadAppointment(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadAppointmentByPage with correct values", async () => {
    await testInstance.loadAppointmentByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadAppointmentByPage with correct values", async () => {
    await testInstance.loadAppointmentByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(
      0,
      fakeQuery?.fields,
      {
        createdAt: -1,
      },
      10,
      {}
    );
    expect(repository.getPaginate).toHaveBeenCalledTimes(1);
  });
  test("should return a appointmentByPage when loadAppointmentByPage loaded it", async () => {
    const result = await testInstance.loadAppointmentByPage(fakeQuery);
    expect(result).toEqual(fakeAppointmentPaginated);
  });
  test("should return null when loadAppointmentByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadAppointmentByPage(fakeQuery);
    expect(result).toEqual({ appointments: null, total: 0 });
  });
  test("should return null when loadAppointmentByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadAppointmentByPage(null as any);
    expect(result).toEqual({ appointments: null, total: 0 });
  });
  test("should rethrow if load of loadAppointmentByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadAppointmentByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call aggregate of loadAvailableTimes with correct values", async () => {
    await testInstance.loadAvailableTimes({
      ...fakeQueryAvailableTimesRepository,
      professionalId: fakeId,
    });
    expect(repository.aggregate).toHaveBeenCalledWith([
      {
        $match: {
          cancelled: false,
          active: true,
          initDate: {
            $lte: fakeQueryAvailableTimesRepository.endDay,
            $gte: fakeQueryAvailableTimesRepository.initDay,
          },
          endDate: {
            $lte: fakeQueryAvailableTimesRepository.endDay,
            $gte: fakeQueryAvailableTimesRepository.initDay,
          },
          professionalId: new ObjectId(fakeId),
        },
      },
      { $sort: { initDate: 1 } },
      {
        $lookup: {
          as: "professionalDetails",
          foreignField: "_id",
          from: "user",
          localField: "professionalId",
        },
      },
      {
        $project: { endDate: 1, initDate: 1, professionalDetails: { ownerId: 1 } },
      },
      { $unwind: { path: "$professionalDetails" } },
      {
        $lookup: {
          as: "owner",
          foreignField: "_id",
          from: "owner",
          localField: "professionalDetails.ownerId",
        },
      },
      {
        $project: {
          endDate: 1,
          initDate: 1,
          owner: {
            days1: 1,
            days2: 1,
            days3: 1,
            hourEnd1: 1,
            hourEnd2: 1,
            hourEnd3: 1,
            hourLunchEnd1: 1,
            hourLunchEnd2: 1,
            hourLunchEnd3: 1,
            hourLunchStart1: 1,
            hourLunchStart2: 1,
            hourLunchStart3: 1,
            hourStart1: 1,
            hourStart2: 1,
            hourStart3: 1,
          },
        },
      },
      { $unwind: { path: "$owner" } },
      { $group: { _id: "$owner", data: { $push: "$$ROOT" } } },
      { $project: { _id: 1, data: { endDate: 1, initDate: 1 } } },
    ]);
    expect(repository.aggregate).toHaveBeenCalledTimes(1);
  });
  test("should return appointments from loadAvailableTimes", async () => {
    const appointments = await testInstance.loadAvailableTimes({
      ...fakeQueryAvailableTimesRepository,
      professionalId: fakeId,
    });
    expect(appointments).toEqual(fakeAvailableTimesEntity);
  });
  test("should return null if dont have appointments from loadAvailableTimes", async () => {
    repository.aggregate.mockResolvedValueOnce([]);
    const appointments = await testInstance.loadAvailableTimes({
      ...fakeQueryAvailableTimesRepository,
      professionalId: fakeId,
    });
    expect(appointments).toBeNull();
  });
  test("should return null if PASS NULL as parameter loadAvailableTimes", async () => {
    const appointments = await testInstance.loadAvailableTimes(null as any);
    expect(appointments).toBeNull();
  });
  test("should rethrow if loadAvailableTimes throws", async () => {
    repository.aggregate.mockRejectedValueOnce(new Error("Error"));
    const appointments = testInstance.loadAvailableTimes({
      ...fakeQueryAvailableTimesRepository,
      professionalId: fakeId,
    });
    await expect(appointments).rejects.toThrow("Error");
  });
});
