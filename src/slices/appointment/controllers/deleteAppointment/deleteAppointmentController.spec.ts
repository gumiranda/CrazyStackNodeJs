import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { DeleteAppointmentController } from "./deleteAppointmentController";
import { fakeAppointmentEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { IUpdateRequestById, UpdateRequest } from "@/slices/request/useCases";
import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";

describe("DeleteAppointmentController", () => {
  let testInstance: DeleteAppointmentController;
  let deleteAppointment: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  let updateRequest: MockProxy<IUpdateRequestById>;
  let updateReq: jest.Mock;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteAppointment = jest.fn();
    updateRequest = mock();
    updateRequest.updateRequestById.mockResolvedValue({
      ...fakeRequestEntity,
      updatedById: fakeUserEntity?._id,
    });
    updateReq = jest.fn();
    updateReq.mockResolvedValue({
      ...fakeRequestEntity,
      updatedById: fakeUserEntity?._id,
    });
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteAppointment.mockResolvedValue(true);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeAppointmentEntity._id };
    testInstance = new DeleteAppointmentController(
      validation,
      deleteAppointment,
      updateRequest,
      updateReq
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call deleteAppointment with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(true));
    expect(deleteAppointment).toHaveBeenCalledWith({
      fields: { ...fakeQuery, createdById: fakeUserEntity?._id },
      options: {},
    });
    expect(deleteAppointment).toHaveBeenCalledTimes(1);
  });
  test("should throws if deleteAppointment throw", async () => {
    deleteAppointment.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("_id")]);
    const httpResponse = await testInstance.execute({ query: fakeQuery });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("_id")]));
  });
  test("should return bad request when updateReq returns falsy", async () => {
    updateReq.mockResolvedValueOnce(null);
    const result = await testInstance.execute({
      query: { ...fakeQuery, requestId: "any_request_id" },
      userId: fakeUserEntity?._id,
      userLogged: { ...fakeUserEntity, role: "client" },
    });
    expect(result).toEqual(badRequest("Request not found"));
  });
  test("should return bad request when appointmentDeleteed is falsy", async () => {
    deleteAppointment.mockResolvedValueOnce(null);
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
      userLogged: { ...fakeUserEntity, role: "client" },
    });
    expect(result).toEqual(badRequest("Appointment not found"));
  });
  test("should set status 2 when role is owner", async () => {
    const result = await testInstance.execute({
      query: { ...fakeQuery, requestId: "any_request_id" },
      userId: fakeUserEntity?._id,
      userLogged: { ...fakeUserEntity, role: "owner" },
    });
    expect(updateReq).toHaveBeenCalledWith(
      {
        fields: { _id: "any_request_id" },
        options: {},
      },
      expect.objectContaining({
        updatedById: fakeUserEntity?._id,
        updatedByRole: "owner",
        status: 2,
      })
    );
    expect(result).toEqual(ok(true));
  });
});
