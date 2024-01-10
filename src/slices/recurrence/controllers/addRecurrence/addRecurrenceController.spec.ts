import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddRecurrenceController } from "./addRecurrenceController";
import { fakeRecurrenceEntity } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddRecurrenceController", () => {
  let testInstance: AddRecurrenceController;
  let addRecurrence: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addRecurrence = jest.fn();
    addRecurrence.mockResolvedValue({
      ...fakeRecurrenceEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddRecurrenceController(validation, addRecurrence);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeRecurrenceEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeRecurrenceEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addRecurrence with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRecurrenceEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRecurrenceEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addRecurrence).toHaveBeenCalledWith({
      ...fakeRecurrenceEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addRecurrence).toHaveBeenCalledTimes(1);
  });
  test("should throws if addRecurrence throw", async () => {
    addRecurrence.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRecurrenceEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRecurrenceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
