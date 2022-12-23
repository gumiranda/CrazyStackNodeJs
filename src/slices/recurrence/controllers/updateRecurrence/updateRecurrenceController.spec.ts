import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateRecurrenceController } from "./updateRecurrenceController";
import { fakeRecurrenceEntity } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateRecurrenceController", () => {
  let testInstance: UpdateRecurrenceController;
  let updateRecurrence: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateRecurrence = jest.fn();
    updateRecurrence.mockResolvedValue({
      ...fakeRecurrenceEntity,
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
    testInstance = new UpdateRecurrenceController(
      validationQuery,
      validationBody,
      updateRecurrence
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeRecurrenceEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeRecurrenceEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeRecurrenceEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeRecurrenceEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateRecurrence with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRecurrenceEntity,
      query: fakeRecurrenceEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRecurrenceEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateRecurrence).toHaveBeenCalledWith(
      {
        ...fakeRecurrenceEntity,
        createdById: fakeUserEntity?._id,
      },
      fakeRecurrenceEntity
    );
    expect(updateRecurrence).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateRecurrence throw", async () => {
    updateRecurrence.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRecurrenceEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRecurrenceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeRecurrenceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
