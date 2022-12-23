import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddClientController } from "./addClientController";
import { fakeClientEntity } from "@/slices/client/entities/ClientEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddClientController", () => {
  let testInstance: AddClientController;
  let addClient: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addClient = jest.fn();
    addClient.mockResolvedValue({
      ...fakeClientEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddClientController(validation, addClient);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeClientEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeClientEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addClient with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeClientEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeClientEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addClient).toHaveBeenCalledWith({
      ...fakeClientEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addClient).toHaveBeenCalledTimes(1);
  });
  test("should throws if addClient throw", async () => {
    addClient.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeClientEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeClientEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
