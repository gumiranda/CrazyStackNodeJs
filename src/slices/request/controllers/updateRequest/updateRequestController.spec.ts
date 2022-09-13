import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateRequestController } from "./updateRequestController";
import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { IUpdateRequestById } from "@/slices/request/useCases";

describe("UpdateRequestController", () => {
  let testInstance: UpdateRequestController;
  let updateRequest: MockProxy<IUpdateRequestById>;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  let validateAvailableTimes: jest.Mock;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateRequest = mock();
    validateAvailableTimes = jest.fn();
    validateAvailableTimes.mockResolvedValue(true);
    updateRequest.updateRequestById.mockResolvedValue({
      ...fakeRequestEntity,
      updatedById: fakeUserEntity?._id,
    });
    validationQuery = mock();
    validationQuery.validate.mockReturnValue([] as never);
    validationBody = mock();
    validationBody.validate.mockReturnValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new UpdateRequestController(
      validationQuery,
      validationBody,
      updateRequest,
      validateAvailableTimes
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({
      query: fakeRequestEntity,
      userId: fakeUserEntity?._id,
      userLogged: fakeUserEntity,
    });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeRequestEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({
      query: fakeRequestEntity,
      body: fakeRequestEntity,
      userId: fakeUserEntity?._id,
      userLogged: fakeUserEntity,
    });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeRequestEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateRequest with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeRequestEntity,
      body: fakeRequestEntity,
      userId: fakeUserEntity?._id,
      userLogged: fakeUserEntity,
    });
    expect(result).toEqual(
      ok({
        ...fakeRequestEntity,
        updatedById: fakeUserEntity?._id,
      })
    );
    expect(updateRequest.updateRequestById).toHaveBeenCalledWith(fakeRequestEntity?._id, {
      ...fakeRequestEntity,
      status: fakeRequestEntity.status,
      updatedById: fakeUserEntity?._id,
      updatedByRole: fakeUserEntity?.role,
    });
    expect(updateRequest.updateRequestById).toHaveBeenCalledTimes(1);
  });
  test("should return bad request for validateTimes return false", async () => {
    validateAvailableTimes.mockResolvedValue(false);
    const result = await testInstance.execute({
      query: { ...fakeRequestEntity },
      body: { ...fakeRequestEntity, status: 0, date: new Date().toISOString() },
      userId: fakeUserEntity?._id,
      userLogged: fakeUserEntity,
    });
    expect(result).toEqual(badRequest([]));
    expect(validateAvailableTimes).toHaveBeenCalledWith({
      date: new Date().toISOString(),
      initDate: fakeRequestEntity.initDate,
      endDate: fakeRequestEntity.endDate,
      professionalId: fakeRequestEntity.professionalId,
      ownerId: fakeRequestEntity.ownerId,
      serviceId: fakeRequestEntity.serviceId,
    });
    expect(validateAvailableTimes).toHaveBeenCalledTimes(1);
  });
  test("should cancel appointment if appointment is invalid and newstatus===1 ou 7", async () => {
    validateAvailableTimes.mockResolvedValue(false);
    const result = await testInstance.execute({
      query: { ...fakeRequestEntity },
      body: { ...fakeRequestEntity, status: 1, date: new Date().toISOString() },
      userId: fakeUserEntity?._id,
      userLogged: fakeUserEntity,
    });
    expect(result).toEqual(ok({ ...fakeRequestEntity, updatedById: fakeUserEntity?._id }));
    expect(updateRequest.updateRequestById).toHaveBeenCalledWith(fakeRequestEntity?._id, {
      ...fakeRequestEntity,
      status: 4,
      updatedById: fakeUserEntity?._id,
      updatedByRole: fakeUserEntity?.role,
      date: new Date().toISOString(),
    });
    expect(updateRequest.updateRequestById).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateRequest throw", async () => {
    updateRequest.updateRequestById.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      query: fakeRequestEntity,
      userId: fakeUserEntity?._id,
      userLogged: fakeUserEntity,
      body: fakeRequestEntity,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRequestEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeRequestEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
