import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddFidelityController } from "./addFidelityController";
import { fakeFidelityEntity } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddFidelityController", () => {
  let testInstance: AddFidelityController;
  let addFidelity: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addFidelity = jest.fn();
    addFidelity.mockResolvedValue({
      ...fakeFidelityEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddFidelityController(validation, addFidelity);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeFidelityEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeFidelityEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addFidelity with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeFidelityEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeFidelityEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addFidelity).toHaveBeenCalledWith({
      ...fakeFidelityEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addFidelity).toHaveBeenCalledTimes(1);
  });
  test("should throws if addFidelity throw", async () => {
    addFidelity.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeFidelityEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeFidelityEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
