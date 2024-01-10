import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddServiceController } from "./addServiceController";
import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddServiceController", () => {
  let testInstance: AddServiceController;
  let addService: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addService = jest.fn();
    addService.mockResolvedValue({
      ...fakeServiceEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddServiceController(validation, addService);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeServiceEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeServiceEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addService with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeServiceEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeServiceEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addService).toHaveBeenCalledWith({
      ...fakeServiceEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addService).toHaveBeenCalledTimes(1);
  });
  test("should throws if addService throw", async () => {
    addService.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeServiceEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeServiceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
