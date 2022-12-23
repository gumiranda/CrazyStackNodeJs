import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddRequestController } from "./addRequestController";
import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddRequestController", () => {
  let testInstance: AddRequestController;
  let addRequest: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addRequest = jest.fn();
    addRequest.mockResolvedValue({
      ...fakeRequestEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddRequestController(validation, addRequest);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeRequestEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeRequestEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addRequest with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRequestEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRequestEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addRequest).toHaveBeenCalledWith({
      ...fakeRequestEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addRequest).toHaveBeenCalledTimes(1);
  });
  test("should throws if addRequest throw", async () => {
    addRequest.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRequestEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRequestEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
