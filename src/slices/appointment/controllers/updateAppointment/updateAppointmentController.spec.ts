import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateAppointmentController } from "./updateAppointmentController";
import { fakeAppointmentEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateAppointmentController", () => {
  let testInstance: UpdateAppointmentController;
  let updateAppointment: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateAppointment = jest.fn();
    updateAppointment.mockResolvedValue({
      ...fakeAppointmentEntity,
      createdById: fakeUserEntity?._id,
    });
    validationQuery = mock();
    validationQuery.validate.mockResolvedValue([] as never);
    validationBody = mock();
    validationBody.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new UpdateAppointmentController(
      validationQuery,
      validationBody,
      updateAppointment
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeAppointmentEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeAppointmentEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeAppointmentEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeAppointmentEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateAppointment with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeAppointmentEntity,
      query: fakeAppointmentEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeAppointmentEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateAppointment).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeAppointmentEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeAppointmentEntity
    );
    expect(updateAppointment).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateAppointment throw", async () => {
    updateAppointment.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeAppointmentEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeAppointmentEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeAppointmentEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
