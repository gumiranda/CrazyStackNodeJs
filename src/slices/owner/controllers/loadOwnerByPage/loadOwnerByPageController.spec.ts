import { describe, it, test, expect, beforeEach, beforeAll, afterAll, jest } from "bun:test";
import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadOwnerByPageController } from "./loadOwnerByPageController";
import {
  fakeOwnerEntity,
  fakeOwnerPaginated,
} from "@/slices/owner/entities/OwnerEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("LoadOwnerByPageController", () => {
  let testInstance: LoadOwnerByPageController;
  let loadOwnerByPage: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  let fakeQueryParams: any;
  let fakeRestQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadOwnerByPage = jest.fn();
    loadOwnerByPage.mockResolvedValue(fakeOwnerPaginated);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    jest.clearAllMocks();
    fakeQueryParams = { _id: fakeOwnerEntity._id, createdById: fakeUserEntity?._id };
    fakeRestQuery = { page: 1, sortBy: "name", typeSort: "asc" };
    fakeQuery = { ...fakeQueryParams, ...fakeRestQuery };
    testInstance = new LoadOwnerByPageController(validation, loadOwnerByPage);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadOwnerByPage with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeOwnerPaginated));
    expect(loadOwnerByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: {
        sort: { [fakeRestQuery?.sortBy]: 1 },
        page: fakeRestQuery?.page,
        limitPerPage: 10,
      },
    });
    expect(loadOwnerByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadOwnerByPage with correct params in desc order", async () => {
    const result = await testInstance.execute({
      query: { ...fakeQuery, typeSort: "desc" },
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeOwnerPaginated));
    expect(loadOwnerByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: {
        sort: { [fakeRestQuery?.sortBy]: -1 },
        page: fakeRestQuery?.page,
        limitPerPage: 10,
      },
    });
    expect(loadOwnerByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadOwnerByPage with correct params without http query", async () => {
    const result = await testInstance.execute({
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeOwnerPaginated));
  });
  test("should throws if loadOwnerByPage throw", async () => {
    loadOwnerByPage.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("page")]);
    const httpResponse = await testInstance.execute({ query: fakeQuery });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("page")]));
  });
  test("should include createdById in fields when role is professional", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
      userLogged: { ...fakeUserEntity, role: "professional" },
    });
    expect(result).toEqual(ok(fakeOwnerPaginated));
    expect(loadOwnerByPage).toHaveBeenCalledWith(
      expect.objectContaining({
        fields: expect.objectContaining({
          createdById: fakeUserEntity?._id,
        }),
      })
    );
  });
  test("should NOT include createdById in fields when role is admin", async () => {
    const queryWithoutCreatedById = { _id: fakeOwnerEntity._id };
    const result = await testInstance.execute({
      query: { ...queryWithoutCreatedById, page: 1, sortBy: "name", typeSort: "asc" },
      userId: fakeUserEntity?._id,
      userLogged: { ...fakeUserEntity, role: "admin" },
    });
    expect(result).toEqual(ok(fakeOwnerPaginated));
    expect(loadOwnerByPage).toHaveBeenCalledWith(
      expect.objectContaining({
        fields: expect.not.objectContaining({
          createdById: expect.anything(),
        }),
      })
    );
  });
});
