import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateServiceController } from "./updateServiceController";
import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateServiceController", () => {
  let testInstance: UpdateServiceController;
  let updateService: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateService = jest.fn();
    updateService.mockResolvedValue({
      ...fakeServiceEntity,
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
    testInstance = new UpdateServiceController(
      validationQuery,
      validationBody,
      updateService
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeServiceEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeServiceEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeServiceEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeServiceEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateService with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeServiceEntity,
      query: fakeServiceEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeServiceEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateService).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeServiceEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeServiceEntity
    );
    expect(updateService).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateService throw", async () => {
    updateService.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeServiceEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeServiceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeServiceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
