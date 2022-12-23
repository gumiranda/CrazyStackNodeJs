import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddOwnerController } from "./addOwnerController";
import { fakeOwnerEntity } from "@/slices/owner/entities/OwnerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddOwnerController", () => {
  let testInstance: AddOwnerController;
  let addOwner: jest.Mock;
  let loadOwner: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addOwner = jest.fn();
    addOwner.mockResolvedValue({
      ...fakeOwnerEntity,
      createdById: fakeUserEntity?._id,
    });
    loadOwner = jest.fn();
    loadOwner.mockResolvedValue(null);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddOwnerController(validation, addOwner, loadOwner);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeOwnerEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeOwnerEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addOwner with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeOwnerEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeOwnerEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addOwner).toHaveBeenCalledWith({
      ...fakeOwnerEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addOwner).toHaveBeenCalledTimes(1);
  });
  test("should throws if addOwner throw", async () => {
    addOwner.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeOwnerEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should call loadOwner with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeOwnerEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeOwnerEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(loadOwner).toHaveBeenCalledWith({
      fields: { createdById: fakeUserEntity?._id },
      options: {},
    });
    expect(loadOwner).toHaveBeenCalledTimes(1);
  });
  test("should return bad request if owner exists", async () => {
    loadOwner.mockResolvedValueOnce(fakeOwnerEntity);
    const result = await testInstance.execute({
      body: fakeOwnerEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      badRequest([{ field: "createdById", message: "Owner already exists" }])
    );
  });
  test("should throws if loadOwner throw", async () => {
    loadOwner.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeOwnerEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeOwnerEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
