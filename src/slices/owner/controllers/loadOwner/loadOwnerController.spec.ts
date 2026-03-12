import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadOwnerController } from "./loadOwnerController";
import { fakeOwnerEntity } from "@/slices/owner/entities/OwnerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("LoadOwnerController", () => {
  let testInstance: LoadOwnerController;
  let loadOwner: jest.Mock;
  let loadServiceByPage: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadOwner = jest.fn();
    loadOwner.mockResolvedValue({
      ...fakeOwnerEntity,
      createdById: fakeUserEntity?._id,
    });
    loadServiceByPage = jest.fn();
    loadServiceByPage.mockResolvedValue({
      services: [{ name: "Service1" }],
      total: 1,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new LoadOwnerController(validation, loadOwner, loadServiceByPage);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeOwnerEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeOwnerEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadOwner with correct params", async () => {
    await testInstance.execute({ query: fakeOwnerEntity });
    expect(loadOwner).toHaveBeenCalledWith({
      fields: fakeOwnerEntity,
      options: {},
    });
    expect(loadOwner).toHaveBeenCalledTimes(1);
  });
  test("should return ok with owner and services", async () => {
    const result = await testInstance.execute({
      query: fakeOwnerEntity,
    });
    expect(result).toEqual(
      ok({
        ...fakeOwnerEntity,
        createdById: fakeUserEntity?._id,
        services: { services: [{ name: "Service1" }], total: 1 },
      })
    );
  });
  test("should call loadServiceByPage with correct params", async () => {
    await testInstance.execute({ query: fakeOwnerEntity });
    expect(loadServiceByPage).toHaveBeenCalledWith({
      fields: { createdById: fakeUserEntity?._id },
      options: { sort: { createdAt: 1 }, page: 1, limitPerPage: 100 },
    });
  });
  test("should return bad request if validation fails", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeOwnerEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should throws if loadOwner throw", async () => {
    loadOwner.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({ query: fakeOwnerEntity });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should throws if loadServiceByPage throw", async () => {
    loadServiceByPage.mockRejectedValueOnce(new Error("service_error"));
    const result = testInstance.execute({ query: fakeOwnerEntity });
    await expect(result).rejects.toThrow(new Error("service_error"));
  });
  test("should handle owner with undefined createdById", async () => {
    loadOwner.mockResolvedValueOnce({ ...fakeOwnerEntity, createdById: undefined });
    const result = await testInstance.execute({ query: fakeOwnerEntity });
    expect(loadServiceByPage).toHaveBeenCalledWith({
      fields: { createdById: undefined },
      options: { sort: { createdAt: 1 }, page: 1, limitPerPage: 100 },
    });
    expect(result.statusCode).toBe(200);
  });
  test("should handle null ownerLoaded gracefully", async () => {
    loadOwner.mockResolvedValueOnce(null);
    const result = await testInstance.execute({ query: fakeOwnerEntity });
    expect(loadServiceByPage).toHaveBeenCalledWith({
      fields: { createdById: undefined },
      options: { sort: { createdAt: 1 }, page: 1, limitPerPage: 100 },
    });
    expect(result.statusCode).toBe(200);
  });
  test("should return ok merging ownerLoaded and services", async () => {
    const fakeServices = { services: [{ name: "A" }, { name: "B" }], total: 2 };
    loadServiceByPage.mockResolvedValueOnce(fakeServices);
    const result = await testInstance.execute({ query: fakeOwnerEntity });
    expect(result).toEqual(
      ok({
        ...fakeOwnerEntity,
        createdById: fakeUserEntity?._id,
        services: fakeServices,
      })
    );
  });
});
