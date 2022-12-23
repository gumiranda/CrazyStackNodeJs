import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateClientController } from "./updateClientController";
import { fakeClientEntity } from "@/slices/client/entities/ClientEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateClientController", () => {
  let testInstance: UpdateClientController;
  let updateClient: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateClient = jest.fn();
    updateClient.mockResolvedValue({
      ...fakeClientEntity,
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
    testInstance = new UpdateClientController(
      validationQuery,
      validationBody,
      updateClient
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeClientEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeClientEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeClientEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeClientEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateClient with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeClientEntity,
      query: fakeClientEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeClientEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateClient).toHaveBeenCalledWith(
      {
        ...fakeClientEntity,
        createdById: fakeUserEntity?._id,
      },
      fakeClientEntity
    );
    expect(updateClient).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateClient throw", async () => {
    updateClient.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeClientEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeClientEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeClientEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
