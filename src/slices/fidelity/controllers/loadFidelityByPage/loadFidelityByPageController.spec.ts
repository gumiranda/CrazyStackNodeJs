import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { LoadFidelityByPageController } from "./loadFidelityByPageController";
import {
  fakeFidelityEntity,
  fakeFidelityPaginated,
} from "@/slices/fidelity/entities/FidelityEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("LoadFidelityByPageController", () => {
  let testInstance: LoadFidelityByPageController;
  let loadFidelityByPage: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  let fakeQueryParams: any;
  let fakeRestQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadFidelityByPage = jest.fn();
    loadFidelityByPage.mockResolvedValue(fakeFidelityPaginated);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQueryParams = { _id: fakeFidelityEntity._id };
    fakeRestQuery = { page: 1, sortBy: "name", typeSort: "asc" };
    fakeQuery = { ...fakeQueryParams, ...fakeRestQuery };
    testInstance = new LoadFidelityByPageController(validation, loadFidelityByPage);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadFidelityByPage with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeFidelityPaginated));
    expect(loadFidelityByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: { sort: { [fakeRestQuery?.sortBy]: 1 }, page: fakeRestQuery?.page },
    });
    expect(loadFidelityByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadFidelityByPage with correct params in desc order", async () => {
    const result = await testInstance.execute({
      query: { ...fakeQuery, typeSort: "desc" },
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeFidelityPaginated));
    expect(loadFidelityByPage).toHaveBeenCalledWith({
      fields: fakeQueryParams,
      options: { sort: { [fakeRestQuery?.sortBy]: -1 }, page: fakeRestQuery?.page },
    });
    expect(loadFidelityByPage).toHaveBeenCalledTimes(1);
  });
  test("should call loadFidelityByPage with correct params without http query", async () => {
    const result = await testInstance.execute({
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(fakeFidelityPaginated));
  });
  test("should throws if loadFidelityByPage throw", async () => {
    loadFidelityByPage.mockRejectedValueOnce(new Error("error"));
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
});
