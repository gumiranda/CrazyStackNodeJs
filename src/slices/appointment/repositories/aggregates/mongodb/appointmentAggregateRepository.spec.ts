import {
  fakeAvailableTimesEntity,
  fakeQueryAvailableTimesRepository,
} from "@/slices/appointment/entities/AppointmentEntity.spec";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { ObjectId } from "mongodb";
import { AppointmentAggregateRepository } from "./appointmentAggregateRepository";
import { MongoRepository } from "@/application/infra";

describe("Appointment Mongo Repository", () => {
  let fakeQuery: Query;
  let fakeId: string;
  let fakeInvoice: any;
  let testInstance: AppointmentAggregateRepository;
  let repository: MockProxy<MongoRepository>;
  beforeAll(async () => {
    fakeId = new ObjectId().toString();
    fakeQuery = { fields: { name: "123" }, options: {} };
    fakeInvoice = {
      appointments: [
        {
          _id: "serviceInfo",
          total: 100,
        },
      ],
    };
    MockDate.set(new Date());
    repository = mock<MongoRepository>();
    repository.aggregate.mockResolvedValue([fakeAvailableTimesEntity]);
  });
  beforeEach(async () => {
    testInstance = new AppointmentAggregateRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
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
  test("should return null if initDate or endDate is not provided", async () => {
    const result = await testInstance.loadInvoice({ fields: {} });
    expect(result).toBeNull();
  });

  test("should call aggregate of loadInvoice with correct values", async () => {
    fakeQuery = {
      ...fakeQuery,
      fields: {
        ...fakeQuery.fields,
        initDate: new Date(),
        endDate: new Date(),
      },
    };
    await testInstance.loadInvoice(fakeQuery);
    expect(repository.aggregate).toHaveBeenCalledWith([
      {
        $match: {
          initDate: { $lte: fakeQuery.fields.initDate, $gte: fakeQuery.fields.endDate },
          cancelled: false,
          active: true,
          name: "123",
        },
      },
      {
        $lookup: {
          from: "service",
          localField: "serviceId",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      { $unwind: { path: "$serviceInfo" } },
      {
        $group: {
          _id: "$serviceInfo",
          total: { $sum: "$serviceInfo.price" },
        },
      },
    ]);
    expect(repository.aggregate).toHaveBeenCalledTimes(1);
  });

  test("should return invoice when loadInvoice is called", async () => {
    repository.aggregate.mockResolvedValueOnce(fakeInvoice.appointments);
    const result = await testInstance.loadInvoice({
      fields: {
        initDate: new Date(),
        endDate: new Date(),
      },
    });
    expect(result).toEqual(fakeInvoice);
  });

  test("should return empty array if loadInvoice returns no appointments", async () => {
    repository.aggregate.mockResolvedValueOnce([]);
    const result = await testInstance.loadInvoice({
      fields: {
        initDate: new Date(),
        endDate: new Date(),
      },
    });
    expect(result).toEqual({ appointments: [] });
  });
});
