import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddAppointmentController } from "./addAppointmentController";
import { fakeAppointmentEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddAppointmentController", () => {
  let testInstance: AddAppointmentController;
  let addAppointment: jest.Mock;
  let validateAvailableTimes: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addAppointment = jest.fn();
    addAppointment.mockResolvedValue({
      ...fakeAppointmentEntity,
      createdById: fakeUserEntity?._id,
    });
    validateAvailableTimes = jest.fn();
    validateAvailableTimes.mockResolvedValue(true);
    validation = mock();
    validation.validate.mockReturnValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddAppointmentController(
      validation,
      addAppointment,
      validateAvailableTimes
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeAppointmentEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeAppointmentEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addAppointment with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeAppointmentEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeAppointmentEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addAppointment).toHaveBeenCalledWith({
      ...fakeAppointmentEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addAppointment).toHaveBeenCalledTimes(1);
  });
  test("should call validateAvailableTimes with correct params and return bad request if returns false in validation", async () => {
    validateAvailableTimes.mockResolvedValueOnce(false);
    const result = await testInstance.execute({
      body: fakeAppointmentEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(badRequest([]));
    expect(validateAvailableTimes).toHaveBeenCalledWith({
      date: fakeAppointmentEntity?.initDate,
      initDate: fakeAppointmentEntity?.initDate,
      endDate: fakeAppointmentEntity?.endDate,
      professionalId: fakeAppointmentEntity?.professionalId,
      ownerId: fakeAppointmentEntity?.ownerId,
      serviceId: fakeAppointmentEntity?.serviceId,
    });
    expect(validateAvailableTimes).toHaveBeenCalledTimes(1);
  });
  test("should throws if addAppointment throw", async () => {
    addAppointment.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeAppointmentEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeAppointmentEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
